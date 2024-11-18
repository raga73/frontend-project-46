import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'node:path';
import genDiff from '../src/gendiff.js';
import fileParse from '../utils/parser.js';
import stylishFormatter from '../formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json stylish format gendiff check', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const file1 = fileParse(filePath1);
  const file2 = fileParse(filePath2);
  const received = stylishFormatter(genDiff(file1, file2));
  const expected = readFile('file1_file2_differences.txt');
  expect(received).toEqual(expected);
  
})

test('yaml stylish format gendiff check', () => {
    const filePath3 = getFixturePath('file3.yml');
    const filePath4 = getFixturePath('file4.yaml');
    const file3 = fileParse(filePath3);
    const file4 = fileParse(filePath4);
    const received = stylishFormatter(genDiff(file3, file4));
    const expected = readFile('file3_file4_differences.txt');
    expect(received).toEqual(expected);
});
