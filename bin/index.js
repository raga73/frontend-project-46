#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/gendiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.1', '-V, --version', 'output the version number')
  .argument('filepath1')
  .argument('filepath2')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format (options: stylish, plain, json)', 'stylish')
  .action((filePath1, filePath2) => {
    const options = program.opts();
    console.log(genDiff(filePath1, filePath2, options.format))
  });

program.parse();

