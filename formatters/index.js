import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const formatter = (node, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylishFormatter(node);
    case 'plain':
      return plainFormatter(node);
    case 'json':
      return JSON.stringify(jsonFormatter(node));
    default:
      return stylishFormatter(node);
  }
};

export default formatter;
