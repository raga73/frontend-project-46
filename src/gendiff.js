import _ from 'lodash';
import fileParse from '../utils/parser.js';

export default (filepath1, filepath2) => {
  const file1 = (fileParse(filepath1));
  const file2 = (fileParse(filepath2));
  const commonKeys = _.union(Object.keys(file1), Object.keys(file2)).sort();
  const filesDifferences = commonKeys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return ` + ${key}: ${file2[key]}`;
    } if (!Object.hasOwn(file2, key)) {
      return ` - ${key}: ${file1[key]}`;
    }
    if (file1[key] !== file2[key]) {
      return ` - ${key}: ${file1[key]}\n + ${key}: ${file2[key]}`;
    }
    if (file1[key] === file2[key]) {
      return `   ${key}: ${file1[key]}`;
    }
    return null;
  });
  const stringWithFilesDifferences = filesDifferences.join('\n');
  return `{\n${stringWithFilesDifferences}\n}`;
};
