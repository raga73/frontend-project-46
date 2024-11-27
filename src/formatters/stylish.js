import _ from 'lodash';

export default (obj, replacer = ' ', spacesCount = 4) => {
  const iter = (node, depth) => {
    const currentInd = replacer.repeat(depth * spacesCount);
    const bracketInd = replacer.repeat((depth * spacesCount) - spacesCount);
    const bracketIndShifted = replacer.repeat(depth * spacesCount - 2);

    const stringify = (tree) => {
      const line = Object.entries(tree)
        .map(([key, value]) => `${currentInd}${key}: ${iter(value, depth + 1)}\n`);
      return `{\n${line.join('')}${bracketInd}}`;
    };

    if (Array.isArray(node)) {
      const result = node
        .map(({
          name, value, newValue, oldValue, mark,
        }) => {
          switch (mark) {
            case 'removed':
              return `${bracketIndShifted}- ${name}: ${iter(value, depth + 1)}\n`;
            case 'added':
              return `${bracketIndShifted}+ ${name}: ${iter(value, depth + 1)}\n`;
            case 'unchanged':
            case 'changed':
              return `${currentInd}${name}: ${iter(value, depth + 1)}\n`;
            case 'updated':
              return `${bracketIndShifted}- ${name}: ${iter(oldValue, depth + 1)}\n${bracketIndShifted}+ ${name}: ${iter(newValue, depth + 1)}\n`;
            default:
              throw new Error('Wrong mark definition!');
          }
        });
      return `{\n${result.join('')}${bracketInd}}`;
    }
    if (_.isObject(node)) {
      return stringify(node);
    }
    return node;
  };
  return iter(obj, 1);
};
