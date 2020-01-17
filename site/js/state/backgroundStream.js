import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import uuid from 'uuid/v4';
import _ from 'lodash';
import chroma from 'chroma-js';

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
    }, true);

  stream.do.arrangeTables();

  return stream;
};
