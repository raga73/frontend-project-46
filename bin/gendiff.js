#!/usr/bin/env node
import { program } from 'commander';

program
	.version('0.0.1', '-V, --version', 'output the version number')
	.description('Compares two configuration files and shows a difference.')
	//.argument('<type>')
	.option('-f, --format [type]', 'output format')

program.parse();
