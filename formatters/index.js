import stylishFormatter from '../formatters/stylish.js';
import plainFormatter from '../formatters/plain.js';
import jsonFormatter from '../formatters/json.js';

const formatter = (node, formatType) => {
    switch (formatType) {
        case 'stylish':
            return stylishFormatter(node);
        case 'plain':
            return plainFormatter(node);
        case 'json':
            return JSON.stringify(jsonFormatter(node));
        default:
            throw new Error(`'Unsupported format type ${formatType}!'`);
          };
    };

    export default formatter;