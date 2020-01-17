import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import _ from 'lodash';
import ListItem from '../classes/ListItem';

export default new ValueStream('waitState')
  .property('speed', 500, 'integer')
  .method('changeSpeed', (s, e) => {
    s.do.setSpeed(Number.parseInt(e.target.value, 0));
  })
  .property('processing', '', 'string')
  .method('getProcessingItem', (s) => s.do.itemById(s.my.processing))
  .method('itemById', (s, id) => {
    if (!id) return null;
    return _.find(s.my.items, { id });
  })
  .method(
    'complete',
    (s, id, stack) => {
      const item = s.do.itemById(id);
      if (item) {
        item.stack = stack;
        item.processed = true;
        s.do.setItems(s.my.items.map((i) => (i.id === id ? i.clone() : i)));
        s.do.processNext();
      } else {
        console.log('error = cannot complete ', id);
        s.do.setProcessing('');
      }
    },
    true,
  )
  .method('processNext', (s) => {
    const list = s.do.unprocessedItems(s.my.processOnlyChecked);

    if (list.length) {
      s.do.setProcessing(_.first(list).id);
    } else {
      s.do.setProcessing('');
    }
  })
  .method('unprocessedItems', (s, onlyChecked = false) => {
    const list = onlyChecked ? s.do.checkedItems() : s.my.items;
    return list.filter((i) => !i.processed);
  })
  .method('checkedItems', (stream) => stream.my.items.filter((s) => s.checked))
  .property('processOnlyChecked', false, 'boolean')
  .method('process', (s, firstTime) => {
    if (s.my.processing) return s.my.processing;

    if (firstTime) {
      if (s.do.checkedItems().length) {
        s.do.setProcessOnlyChecked(true);
      } else {
        s.do.setProcessOnlyChecked(false);
      }
    }

    const items = s.do.unprocessedItems(s.my.processOnlyChecked);

    if (items.length) {
      const first = _.first(items);
      s.do.setProcessing(_.get(first, 'id', ''));
      return s.my.processing;
    }
    s.do.setProcessing('');

    return false;
  })
  .property('items', [], 'array')
  .method('hasChecked', (store) => {
    const items = [...store.my.items];
    while (items.length) {
      if (items.pop().checked) {
        return true;
      }
    }
    return false;
  })
  .method('hasItems', (s) => _.get(s, 'my.items.length'))
  .method('clearChecked', (s) => {
    if (s.my.processing) return;
    s.do.setItems(s.my.items.filter((i) => !i.checked));
  })
  .method('toggleChecked', (s, item) => {
    if (s.my.processing) return;
    if (!item) {
      console.log('attempt to toggle without target');
      return;
    }
    console.log('toggling', item);
    item.toggleChecked();
    s.do.setItems([...s.my.items]);
  })
  .method('addItem', (s, label) => {
    s.do.setItems([...s.my.items, new ListItem(label)]);
  });
