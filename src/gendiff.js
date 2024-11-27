import _ from 'lodash';
import fileParse from '../utils/parser.js';
import formatter from '../formatters/index.js';

export default (filePath1, filePath2, formatType) => {
  const file1 = (fileParse(filePath1));
  const file2 = (fileParse(filePath2));

  const iter = (node1, node2) => {
    const commonKeys = _.sortBy(_.union(Object.keys(node1), Object.keys(node2)));
    const filesDifferences = commonKeys.map((key) => {
      if (Object.hasOwn(node1, key) && Object.hasOwn(node2, key)) {
        if (_.isObject(node1[key]) && _.isObject(node2[key])) {
          return {
            name: key,
            value: iter(node1[key], node2[key]),
            mark: 'changed',
          };
        }
        if (node1[key] === node2[key]) {
          return {
            name: key,
            value: node1[key],
            mark: 'unchanged',
          };
        }
        if (node1[key] !== node2[key]) {
          return {
            name: key,
            oldValue: node1[key],
            newValue: node2[key],
            mark: 'updated',
          };
        }
      }
      if (Object.hasOwn(node1, key) && !Object.hasOwn(node2, key)) {
        return {
          name: key,
          value: node1[key],
          mark: 'removed',
        };
      }
      if (!Object.hasOwn(node1, key) && Object.hasOwn(node2, key)) {
        return {
          name: key,
          value: node2[key],
          mark: 'added',
        };
      }
      return '';
    });
    return filesDifferences;
  };
  return formatter(iter(file1, file2), formatType);
};
