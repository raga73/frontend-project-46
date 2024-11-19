import _ from 'lodash';

const genDiff = (file1, file2) => {
  const commonKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const filesDifferences = commonKeys.reduce((acc, key) => {
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        acc[key] = {
          children: genDiff(file1[key], file2[key]),
          mark: 'diff',
        };
        return acc;
      } else {
        if (file1[key] === file2[key]) {
          acc[key] = {
            children: file1[key],
            mark: 'unchanged',
          };
          return acc;
        }
        if (file1[key] !== file2[key]) {
              acc[key] = {
                children: {
                old: file1[key],
                new: file2[key],
                },
                mark: 'updated',
              }
              return acc;
            }  
          }
        }
      if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
        acc[key] = {
          children: file1[key],
          mark: 'removed',
        };
        return acc;
      }
      if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        acc[key] = {
          children: file2[key],
          mark: 'added',
        };
        return acc;
      }
    }, {});
  return filesDifferences;
};

export default genDiff;