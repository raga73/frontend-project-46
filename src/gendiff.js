import _ from 'lodash';
import fileParse from '../utils/parser.js';
import formatter from '../formatters/index.js';

export default (filePath1, filePath2, formatType) => {
  const file1 = (fileParse(filePath1));
  const file2 = (fileParse(filePath2));

  const iter = (node1, node2) => {
    const commonKeys = _.sortBy(_.union(Object.keys(node1), Object.keys(node2)));
    const filesDifferences = commonKeys.reduce((acc, key) => {
      if (Object.hasOwn(node1, key) && Object.hasOwn(node2, key)) {
        if (_.isObject(node1[key]) && _.isObject(node2[key])) {
          acc[key] = {
            value: iter(node1[key], node2[key]),
            mark: 'changed',
          };
          return acc;
        }
        if (node1[key] === node2[key]) {
          acc[key] = {
            value: node1[key],
            mark: 'unchanged',
          };
          return acc;
        }
        if (node1[key] !== node2[key]) {
          acc[key] = {
            value: {
              old: node1[key],
              new: node2[key],
            },
            mark: 'updated',
          };
          return acc;
        }
      }
      if (Object.hasOwn(node1, key) && !Object.hasOwn(node2, key)) {
        acc[key] = {
          value: node1[key],
          mark: 'removed',
        };
        return acc;
      }
      if (!Object.hasOwn(node1, key) && Object.hasOwn(node2, key)) {
        acc[key] = {
          value: node2[key],
          mark: 'added',
        };
        return acc;
      }
      return acc;
    }, {});
    return filesDifferences;
  };
  return formatter(iter(file1, file2), formatType);
};
