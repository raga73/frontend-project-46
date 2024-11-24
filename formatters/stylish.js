import _ from 'lodash';

export default (obj, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    const currentInd = replacer.repeat(depth * spacesCount);
    const bracketInd = replacer.repeat((depth * spacesCount) - spacesCount);
    const bracketIndShifted = replacer.repeat(depth * spacesCount - 2);
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const str = Object
      .entries(currentValue)
      .map(([key, keyValue]) => {
        switch (keyValue.mark) {
          case 'removed':
            return `${bracketIndShifted}- ${key}: ${iter(keyValue.value, depth + 1)}\n`;
          case 'added':
            return `${bracketIndShifted}+ ${key}: ${iter(keyValue.value, depth + 1)}\n`;
          case 'unchanged':
          case 'changed':
            return `${currentInd}${key}: ${iter(keyValue.value, depth + 1)}\n`;
          case 'updated':
            return `${bracketIndShifted}- ${key}: ${iter(keyValue.value.old, depth + 1)}\n${bracketIndShifted}+ ${key}: ${iter(keyValue.value.new, depth + 1)}\n`;
          default:
            return `${currentInd}${key}: ${iter(keyValue, depth + 1)}\n`;
        }
      });
    return `{\n${str.join('')}${bracketInd}}`;
  };
  return iter(obj, 1);
};
