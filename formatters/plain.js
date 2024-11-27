import _ from 'lodash';

export default (node) => {
  const format = (value) => {
    if (_.isObject(value) && value !== null) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const iter = (currentNode, path = '') => {
    const currPath = path === '' ? '' : `${path}.`;
    const line = currentNode
      .map(({
        name, value, oldValue, newValue, mark,
      }) => {
        switch (mark) {
          case 'removed':
            return `Property '${currPath}${name}' was removed\n`;
          case 'added':
            return `Property '${currPath}${name}' was added with value: ${format(value)}\n`;
          case 'updated':
            return `Property '${currPath}${name}' was updated. From ${format(oldValue)} to ${format(newValue)}\n`;
          case 'changed':
            return `${iter(value, currPath + name)}`;
          default:
        }
        return '';
      });
    return line.join('');
  };
  return iter(node);
};
