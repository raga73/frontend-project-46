import _ from 'lodash';

const stylishFormatter = (obj,replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    const currentInd = replacer.repeat(depth * spacesCount);
    const bracketInd = replacer.repeat((depth * spacesCount) - spacesCount);
    const bracketIndShifted = replacer.repeat(depth * spacesCount - 2);
      if (!_.isObject(currentValue)) {
        return currentValue;
      }
    const str = Object
      .entries(currentValue)
      .reduce((acc, [key, value]) => {
        switch (value.mark) {
          case 'removed':
            acc += `${bracketIndShifted}- ${key}: ${iter(value.children, depth + 1)}\n`;
            return acc;
          case 'added':
            acc += `${bracketIndShifted}+ ${key}: ${iter(value.children, depth + 1)}\n`;
            return acc;
          case 'unchanged': 
            acc += `${currentInd}${key}: ${iter(value.children, depth + 1)}\n`;
            return acc;
          case 'updated':
            acc += `${bracketIndShifted}- ${key}: ${iter(value.childrenOld, depth + 1)}\n${bracketIndShifted}+ ${key}: ${iter(value.childrenNew, depth + 1)}\n`;
            return acc;
            }
        acc += `${currentInd}${key}: ${iter(value, depth + 1)}\n`;
        return acc;
    }, '');
    return `{\n${str}${bracketInd}}`;
    }
  return iter(obj, 1);
};

export default stylishFormatter;

