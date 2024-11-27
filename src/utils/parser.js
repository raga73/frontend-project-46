import path from 'node:path';
import fs from 'node:fs';
import { cwd } from 'process';
import yaml from 'js-yaml';

export default (filePath) => {
  const getPath = (filename) => path.resolve(cwd(), filename);
  const fileExtension = path.extname(filePath);
  if (fileExtension === '.json') {
    return JSON.parse(fs.readFileSync(getPath(filePath)));
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return yaml.load(fs.readFileSync(getPath(filePath)));
  }
  throw new Error(`Wrong file extension ${fileExtension}!`);
};
