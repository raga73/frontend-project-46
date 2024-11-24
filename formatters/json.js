import _ from 'lodash';

export default (obj) => {
  const iter = (currentValue) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const newNode = Object
      .entries(currentValue)
      .map(([key, keyValue]) => {
        const node = {};
        node.name = key;
        if (_.has(keyValue, 'mark')) {
          switch (keyValue.mark) {
            case 'changed':
            case 'added':
            case 'removed':
            case 'unchanged':
              node.value = iter(keyValue.value);
              node.mark = keyValue.mark;
              return node;
            case 'updated':
              node.value = [{
                old: keyValue.value.old,
                new: keyValue.value.new,
              }];
              node.mark = keyValue.mark;
              return node;
            default:
              node.mark = keyValue.mark;
              return node;
          }
        }
        node.value = iter(keyValue);
        return node;
      });
    return newNode;
  };
  return iter(obj);
};
