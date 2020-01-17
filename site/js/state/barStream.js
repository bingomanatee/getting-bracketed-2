import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import { proppify } from '@wonderlandlabs/propper';
import uuid from 'uuid/v4';
import _ from 'lodash';
import chroma from 'chroma-js';

import waitList from './waitList.store';

class Character {
  constructor(item, str) {
    this.item = item;
    this.str = str;
  }

  color() {
    const red = _.random(128, 255);
    const green = _.random(150, 255);
    const blue = _.random(200, 255);
    return chroma(red, green, blue).css();
  }

  draw() {
    const { svg } = this.str.my;
    if (!svg) return;

    this.text = svg.text(this.item.label);
    this.text.attr('font-size', _.random(30, 90))
      .attr('opacity', _.random(0.2, 0.7, true))
      .font('family', '"Fredoka One",  "Helvetica Neue", sans-serif')
      .attr('fill', this.color());
    const maxX = Math.round(this.str.my.width / 2);
    const maxY = Math.round(this.str.my.height - 50);

    this.x = _.random(50, maxX);
    this.y = _.random(100, maxY);

    this.direction = _.random(0, Math.PI * 2, true);
    this.speed = _.random(10, 30);

    this.move();
  }

  move() {
    this.x += this.speed * Math.sin(this.direction);
    this.y += this.speed * Math.sin(this.direction);

    if (this.x > (2 * this.str.my.width)) {
      this.x -= (3 * this.str.my.width);
    } else if (this.x < -this.str.my.width) {
      this.x += (3 * this.str.my.width);
    }

    if (this.y > (2 * this.str.my.height)) {
      this.y -= (3 * this.str.my.height);
    } else if (this.y < -this.str.my.height) {
      this.y += (3 * this.str.my.height);
    }

    this.text.attr('x', this.x)
      .attr('y', this.y);

    setTimeout(() => {
      this.move();
    }, 20);
  }

  tryDraw() {
    if (this.str.my.svg) {
      this.draw();
    } else {
      if (!('tries' in this)) {
        this.tries = 0;
      } else if (this.tries > 5) {
        return;
      }
      setTimeout(() => {
        this.tries += 1;
        this.tryDraw();
      }, 500);
    }
  }
}

export default (props) => {
  const stream = new ValueStream('barState')
    .property('svg', null)
    .property('width', _.get(props, 'size.width', 0), 'number')
    .property('height', _.get(props, 'size.height', 0), 'number')
    .property('tables', [], 'array')
    .method('arrangeTables', (s) => {
      const tables = [];
      const ys = [];
      let y = 200;
      while (y < s.my.height - 50) {
        ys.push(y);
        y += _.random(50, 120) + (y / 100);
      }
      ys
        .forEach((y) => {
          let x = _.random(-150, 50);

          while (x < s.my.width + 50) {
            const myY = y + _.random(-30, 30);
            tables.push({
              id: uuid(),
              x,
              y: myY,
              z: myY,
            });

            x += _.random(250, 400);
          }
        });

      s.do.setTables(tables);
    })
    .method('checkSize', (s, size) => {
      if (!(size)) {
        return;
      }

      const { width, height } = size;
      let changed = false;
      if (s.my.width !== width) {
        s.do.setWidth(width);
        changed = true;
      }

      if (s.my.height !== height) {
        s.do.setHeight(height);
        changed = true;
      }
      if (changed) {
        if (s.my.svg) {
          s.my.svg.size(width, height);
        }
      }

      s.do.arrangeTables();
    }, true)
    .method('syncChars', (s) => {
      const { chars } = s.my;
      waitList.my.items.forEach((item) => {
        if ((item.processed) && (item.balanced) && (!chars.has(item.id))) {
          console.log('adding new item as character', item);
          const char = new Character(item, s);
          chars.set(char.id, char);
          char.tryDraw();
        }
      });
    })
    .property('chars', new Map());

  const sub = waitList.watch('items', () => {
    stream.do.syncChars();
  });

  stream.do.arrangeTables();

  stream.subscribe(false, (err) => {
    console.log('error in backgroundStream: ', err);
  }, (() => sub.unsubscribe()));

  return stream;
};
