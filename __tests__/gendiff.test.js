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

test('gendiff check', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const received = 0;
  const expected = 0;

  expect(received).toEqual(expected);
});
