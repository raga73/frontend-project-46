#!/usr/bin/env node
import { program } from 'commander';
import _ from 'lodash';
import fileParce from '../utils/parcer.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.9.1', '-V, --version', 'output the version number')
  .argument('filepath1')
  .argument('filepath2')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = (fileParce(filepath1));
    const file2 = (fileParce(filepath2));
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
    console.log(`{\n${stringWithFilesDifferences}\n}`);
    return stringWithFilesDifferences;
  });

program.parse();
