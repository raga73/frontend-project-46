import _ from 'lodash';

export default (obj, replacer = ' ', spacesCount = 4) => {
  const iter = (node, depth) => {
    const currentIndent = replacer.repeat(depth * spacesCount);
    const bracketIndent = replacer.repeat((depth * spacesCount) - spacesCount);
    const bracketIndentShifted = replacer.repeat(depth * spacesCount - 2);
    if (Array.isArray(node)) {
      const result = node
        .map(({
          name, value, newValue, oldValue, mark,
        }) => {
          switch (mark) {
            case 'removed':
              return `${bracketIndentShifted}- ${name}: ${iter(value, depth + 1)}\n`;
            case 'added':
              return `${bracketIndentShifted}+ ${name}: ${iter(value, depth + 1)}\n`;
            case 'unchanged':
            case 'changed':
              return `${currentIndent}${name}: ${iter(value, depth + 1)}\n`;
            case 'updated':
              return `${bracketIndentShifted}- ${name}: ${iter(oldValue, depth + 1)}\n${bracketIndentShifted}+ ${name}: ${iter(newValue, depth + 1)}\n`;
            default:
              throw new Error('Wrong mark definition!');
          }
        });
      return `{\n${result.join('')}${bracketIndent}}`;
    }
    if (_.isObject(node)) {
      const line = Object.entries(node)
        .map(([key, value]) => `${currentIndent}${key}: ${iter(value, depth + 1)}\n`);
      return `{\n${line.join('')}${bracketIndent}}`;
    }
    return node;
  };
  return iter(obj, 1);
};
