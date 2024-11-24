import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { expect } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'node:path';
import genDiff from '../src/gendiff.js';
import fileParse from '../utils/parser.js';
import stylishFormatter from '../formatters/stylish.js';
import plainFormatter from '../formatters/plain.js';
import jsonFormatter from '../formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json stylish format gendiff check', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const received = stylishFormatter(genDiff(file1, file2, 'stylish'));
  const expected = readFile('expectedStylishResult.txt');
  expect(received).toEqual(expected);
  
})

test('json plain format gendiff check', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const received = genDiff(file1, file2, 'plain');
  const expected = readFile('expectedPlainResult.txt');
  expect(received).toEqual(expected);
});

test('json JSON format gendiff check', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const received = genDiff(file1, file2, 'json');
  const expected = readFile('expectedJsonResult.txt');
  expect(received).toEqual(expected);
});
