import _ from 'lodash';

export default (obj,replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    const currentInd = replacer.repeat(depth * spacesCount);
    const bracketInd = replacer.repeat((depth * spacesCount) - spacesCount);
    const bracketIndShifted = replacer.repeat(depth * spacesCount - 2);
      if (!_.isObject(currentValue)) {
        return currentValue;
      }
    const str = Object
      .entries(currentValue)
      .reduce((acc, [key, keyValue]) => {
        switch (keyValue.mark) {
          case 'removed':
            acc = acc + `${bracketIndShifted}- ${key}: ${iter(keyValue.value, depth + 1)}\n`;
            return acc;
          case 'added':
            acc = acc + `${bracketIndShifted}+ ${key}: ${iter(keyValue.value, depth + 1)}\n`;
            return acc;
          case 'unchanged':
          case 'changed': 
            acc = `${acc}` + `${currentInd}${key}: ${iter(keyValue.value, depth + 1)}\n`;
            return acc;
          case 'updated':
            acc = acc + `${bracketIndShifted}- ${key}: ${iter(keyValue.value.old, depth + 1)}\n${bracketIndShifted}+ ${key}: ${iter(keyValue.value.new, depth + 1)}\n`;
            return acc;
            default:
            acc = acc + `${currentInd}${key}: ${iter(keyValue, depth + 1)}\n`;
            return acc;
          }
    }, '');
    return `{\n${str}${bracketInd}}`;
    }
  return iter(obj, 1);
};


