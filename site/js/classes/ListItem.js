import uuid from 'uuid/v4';
import { proppify } from '@wonderlandlabs/propper';

class ListItem {
  constructor(label) {
    this.label = label;
    this.checked = false;
    this.id = uuid();
  }

  toggleChecked() {
    this.checked = !this.checked;
  }

  clone() {
    const i = new ListItem(this.label);
    i.id = this.id;
    i.stack = this.stack;
    i.processed = this.processed;
    i.checked = this.checked;
    return i;
  }

  get balanced() {
    if (!this.processed) return false;
    let balanced = this.stack.length;

    this.stack.forEach((item) => {
      if (balanced) {
        balanced = !(item.isOpener || item.isCloser);
      }
    });

    return balanced;
  }
}

proppify(ListItem)
  .addProp('label', '', 'string')
  .addProp('id', '', 'string')
  .addProp('processed', false, 'boolean')
  .addProp('stack', [], 'array')
  .addProp('checked', false, 'boolean');

export default ListItem;
