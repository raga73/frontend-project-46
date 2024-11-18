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
          return `Property '${ancestor}.${key}' was removed\n`;
        case 'added':
            console.log(ancestor)
          return `Property '${ancestor}.${key}' was added with value: ${format(value.children)}\n`;
        case 'updated':
          return `Property '${ancestor}.${key}' was updated. From ${format(value.children.old)} to ${format(value.children.new)}\n`;
        case 'diff':
          return `${iter(value.children,)}`;
        }
      });
      return line.join('');
    };

  let ancestor = '';
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
    return str;
};

export default plainFormatter;
