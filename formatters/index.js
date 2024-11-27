import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const formatter = (node, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylishFormatter(node);
    case 'plain':
      return plainFormatter(node);
    case 'json':
      return JSON.stringify(node);
    default:
      return stylishFormatter(node);
  }
};

export default formatter;
