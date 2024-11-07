import genDiff from '../src/gendiff.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff check', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
  
    const received = genDiff(file1, file2);
    const expected = readFile('file1_file2_differences.txt');
  
    expect(received).toEqual(expected);
  });

