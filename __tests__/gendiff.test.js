import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { expect } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'node:path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json stylish format gendiff check', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const received = genDiff(file1, file2, 'stylish');
  const expected = readFile('expectedStylishResult.txt');
  expect(received).toEqual(expected);
});

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

test('yaml_yml stylish format gendiff check', () => {
  const file1 = 'file1.yml';
  const file2 = 'file2.yml';
  const received = genDiff(file1, file2, 'stylish');
  const expected = readFile('expectedStylishResult.txt');
  expect(received).toEqual(expected);
});

test('yaml_yml plain format gendiff check', () => {
  const file1 = 'file1.yml';
  const file2 = 'file2.yml';
  const received = genDiff(file1, file2, 'plain');
  const expected = readFile('expectedPlainResult.txt');
  expect(received).toEqual(expected);
});

test('yaml_yml JSON format gendiff check', () => {
  const file1 = 'file1.yml';
  const file2 = 'file2.yml';
  const received = genDiff(file1, file2, 'json');
  const expected = readFile('expectedJsonResult.txt');
  expect(received).toEqual(expected);
});
