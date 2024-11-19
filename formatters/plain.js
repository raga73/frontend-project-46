import _ from 'lodash';

const plainFormatter = (obj) => {

    const format = (value) => {
        if (_.isObject(value) && value !== null) {
            return '[complex object]';
        }
        if (typeof value === 'string') {
            return `'${value}'`;
        }
        return value;
    };
  
    const iter = (currentValue) => {
      const line = Object
      .entries(currentValue)
      .map(([key, value]) => {  
        switch (value.mark) {
        case 'removed':
          return `Property '${key}' was removed\n`;
        case 'added':
          return `Property '${key}' was added with value: ${format(value.children)}\n`;
        case 'updated':
          return `Property '${key}' was updated. From ${format(value.children.old)} to ${format(value.children.new)}\n`;
        case 'diff':
          return `${iter(value.children)}`;
        }
      });
      return line.join('');
    };

 /* let ancestor = '';
  const str = Object
    .entries(obj)
    .reduce((acc, [key, value]) => {
      switch (value.mark) {
        case 'diff':
          acc += iter(value.children, ancestor = key);
            return acc;
        case 'removed':
          acc += `Property '${key}' was removed\n`;
            return acc;
        case 'added':
          acc += `Property '${key}' was added with value: ${format(value.children)}\n`;
            return acc;
      }
    }, '');
    return str;*/
    return iter(obj)
};

export default plainFormatter;
