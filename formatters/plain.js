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
  
    const iter = (currentValue, path = '') => {
      path = path ?? '';
      const currPath = path === '' ? '' : `${path}.`
      const line = Object
      .entries(currentValue)
      .map(([key, value]) => {  
        switch (value.mark) {
        case 'removed':
          return `Property '${currPath}${key}' was removed\n`;
        case 'added':
          return `Property '${currPath}${key}' was added with value: ${format(value.children)}\n`;
        case 'updated':
          return `Property '${currPath}${key}' was updated. From ${format(value.children.old)} to ${format(value.children.new)}\n`;
        case 'diff':
          return `${iter(value.children, currPath + key)}`;
        }
      });
      return line.join('');
    };

    return iter(obj);
};

export default plainFormatter;
