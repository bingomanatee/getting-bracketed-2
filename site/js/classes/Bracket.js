import { proppify } from '@wonderlandlabs/propper';

class Bracket {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  has(a) {
    return this.start === a || this.end === a;
  }
}

proppify(Bracket)
  .addProp('start', '', 'string')
  .addProp('end', '', 'string');

export default Bracket;
