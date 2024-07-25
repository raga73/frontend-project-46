#!/usr/bin/env node
import _ from 'lodash';
import { program } from 'commander';
import path from "node:path";
import fs from "node:fs";
import { cwd } from 'node:process';
program
	.version('0.0.1', '-V, --version', 'output the version number')
	.description('Compares two configuration files and shows a difference.')
	.argument('<filepath1>')
	.argument('<filepath2>')
	.action((filepath1, filepath2) => {
		const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
		const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
		const commonKeys = _.union(Object.keys(file1), Object.keys(file2)).sort();
		const res = [];
		commonKeys.map((key) => {
			if (!Object.hasOwn(file1, key)) {
			res.push(` + ${key}: ${file2[key]}`);		
			} else if (!Object.hasOwn(file2, key)) {
				res.push(` - ${key}: ${file1[key]}`);
			} else if (file1[key] !== file2[key]) {
				res.push(` - ${key}: ${file1[key]}`);
				res.push(` + ${key}: ${file2[key]}`);
			} else {
			res.push(`   ${key}: ${file1[key]}`);
			}
		}) 
const str = res.join('\n')
		console.log(`{\n${str}\n}`)
		})
	.helpOption('-h, --help', 'output usage information')
	.option('-f, --format [type]', 'output format')

program.parse();
