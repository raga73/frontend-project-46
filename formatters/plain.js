import _ from 'lodash';

export default (obj) => {
  const format = (value) => {
    if (_.isObject(value) && value !== null) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const iter = (currentValue, path = '') => {
    const currPath = path === '' ? '' : `${path}.`;
    const line = Object
      .entries(currentValue)
      .map(([key, keyValue]) => {
        switch (keyValue.mark) {
          case 'removed':
            return `Property '${currPath}${key}' was removed\n`;
          case 'added':
            return `Property '${currPath}${key}' was added with value: ${format(keyValue.value)}\n`;
          case 'updated':
            return `Property '${currPath}${key}' was updated. From ${format(keyValue.value.old)} to ${format(keyValue.value.new)}\n`;
          case 'changed':
            return `${iter(keyValue.value, currPath + key)}`;
          default:
        }
        return '';
      });
    return line.join('');
  };
  return iter(obj).trimEnd();
};
