#!/usr/bin/env node
import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.9.1', '-V, --version', 'output the version number')
  .argument('filepath1')
  .argument('filepath2')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action();

program.parse();
