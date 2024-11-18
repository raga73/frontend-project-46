#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/gendiff.js';
import fileParse from '../utils/parser.js';
import stylishFormatter from '../formatters/stylish.js';
import plainFormatter from '../formatters/plain.js';
import { writeFileSync } from 'fs';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.1', '-V, --version', 'output the version number')
  .argument('filepath1')
  .argument('filepath2')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'plain')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const file1 = (fileParse(filepath1));
    const file2 = (fileParse(filepath2));
    if (options.format === 'plain') {
      console.log(plainFormatter(genDiff(file1, file2)));
    }
    if (options.format === 'stylish') {
      console.log(stylishFormatter(genDiff(file1, file2)));
    }
//console.log(JSON.stringify(genDiff(file1, file2)))

    //writeFileSync('./__fixtures__/file1_file2_differences.txt', stylishFormatter((unformatted)))
  });

program.parse();

