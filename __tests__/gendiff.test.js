import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'node:path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json plain gendiff check', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const received = genDiff(file1, file2);
  const expected = readFile('file1_file2_differences.txt');
  expect(received).toEqual(expected);
  
})

test('yaml plain gendiff check', () => {
    const file3 = getFixturePath('file3.yaml');
    const file4 = getFixturePath('file4.yml');
  
    const received = genDiff(file3, file4);
    const expected = readFile('file1_file2_differences.txt');
    expect(received).toEqual(expected);
});
