import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import { proppify } from '@wonderlandlabs/propper';
import uuid from 'uuid/v4';
import _ from 'lodash';

import waitList from './waitList.store';
import Bracket from '../classes/Bracket';

const BRACKETS = new Set();
BRACKETS.add(new Bracket('(', ')'));
BRACKETS.add(new Bracket('[', ']'));
BRACKETS.add(new Bracket('{', '}'));

const CLOSERS = new Set();
const OPENERS = new Set();

BRACKETS.forEach((b) => {
  CLOSERS.add(b.end);
  OPENERS.add(b.start);
});

class Character {
  constructor(c) {
    this.id = uuid();
    this.value = c;
  }

  get isOpener() {
    return OPENERS.has(this.value);
  }

  get bracket() {
    let out = null;
    BRACKETS.forEach((b) => {
      if (b.has(this.value)) out = b;
    });
    return out;
  }

  get isCloser() {
    return CLOSERS.has(this.value);
  }

  openerFor(c) {
    if (!(c && c instanceof Character)) return false;
    if (!this.isOpener) return false;
    if (!c.isCloser) return false;
    return c.bracket === this.bracket;
  }

  get type() {
    return 'Character';
  }
}

proppify(Character)
  .addProp('id', 'string')
  .addProp('status', 'string')
  .addProp('color', 'lightGrey')
  .addProp('tag', '', 'string');

class Node {
  constructor(start, ...children) {
    this.start = start;
    this.end = children.pop();
    this.children = _.flattenDeep(children);
    this.id = uuid();
  }

  get color() {
    return this.start.color;
  }

  get tag() {
    return this.start.tag;
  }

  get value() {
    return `${this.start.value}...${this.end.value}`;
  }

  openerFor() {
    return false;
  }

  get isOpener() {
    return false;
  }

  get isCloser() {
    return false;
  }

  get type() {
    return 'Node';
  }
}

proppify(Node)
  .addProp('start')
  .addProp('end')
  .addProp('id', 'string')
  .addProp('children', [], 'array');

export default () => {
  const stream = new ValueStream('processor')
    .property('id', waitList.my.processing || '', 'string')
    .property('charStack', [], 'array')
    .property('stack', [], 'array')
    .property('status', 'new', 'string')
    .property('processError', '', 'string')
    .method('markLast', (s) => {
      try {
        const stack = [...s.my.stack];
        if (!Array.isArray(stack)) {
          return;
        }
        const top = _.last(stack);
        if (top.tag) {
          return true;
        }

        if (top instanceof Character && top.isCloser) {
          let bottom = false;

          let i = stack.length - 2;

          while (!bottom && i >= 0) {
            try {
              const target = stack[i];
              if (target instanceof Character && !target.tag) {
                if (target.openerFor(top)) {
                  bottom = target;
                }
              }
              i -= 1;
            } catch (err) {
              console.log('loop error: ', err);
            }
          }

          if (bottom) {
            const i = stack.indexOf(bottom);
            const tag = uuid();
            const channels = _(_.range(0, 5))
              .map(() => _.random(51, 255))
              .sortBy()
              .slice(1, 4)
              .shuffle()
              .value();
            const taggers = stack.slice(i);

            taggers.forEach((c) => {
              if (c instanceof Character && !c.tag) {
                c.tag = tag;
                c.color = `rgb(${channels.join(',')})`;
              }
            });
            s.do.setStack([...stack]);
            setTimeout(s.do.collapseNode, waitList.my.speed);
            return true; // indicates we are taking control of action flow from the
            // timeout punt of churn
          }
        }
      } catch (error) {
        console.log('markLast error:', error);
      }
    })
    .method('last', (s) => _.last(s.my.stack))
    .method(
      'collapseNode',
      (s) => {
        const last = s.do.last();
        const stack = [...s.my.stack];
        if (last.tag && last instanceof Character) {
          const firstIndex = _.findIndex(stack, (item) => item.tag === last.tag);
          const forNode = stack.slice(firstIndex);
          const rest = stack.slice(0, firstIndex);
          s.do.setStack([...rest, new Node(...forNode)]);
        }
        s.do.churn();
      },
      true,
    )
    .method(
      'churn',
      (s) => {
        const charStack = [...s.my.charStack];
        const last = charStack.shift();
        if (!last) {
          s.do.setStatus('done');
          waitList.do.complete(s.my.id, s.my.stack);
          s.do.setStack([]);
          return;
        }
        s.do.setCharStack(charStack);
        s.do.setStack([...s.my.stack, last]);

        const { id } = s.my;

        if (!s.do.markLast()) {
          setTimeout(() => {
            if (s.my.id === id) {
              s.do.churn();
            }
          }, waitList.my.speed);
        }
      },
      true,
    )
    .method(
      'init',
      (s) => {
        try {
          s.do.setCharStack([]);
          s.do.setProcessError('');
          s.do.setStatus('new');
          s.do.setStack([]);
          const p = waitList.my.processing;
          s.do.setId(p);
          if (!p) {
            return;
          }
          const item = waitList.do.getProcessingItem();
          if (!item) {
            s.do.setStatus('error');
            s.do.setProcessError('cannot find item');
            return;
          }
          s.do.setCharStack(item.label.split('').map((c) => new Character(c)));
          s.do.setStatus('working');
          s.do.churn();
        } catch (err) {
          console.log('init error: ', err);
        }
      },
      true,
    );

  waitList.watch('processing', ({ value }) => {
    if (value !== stream.my.id) stream.do.init();
  });

  stream.do.init();
  return stream;
};
