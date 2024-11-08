import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';

export default (filePath) => {
  const fileExtension = path.extname(filePath);
  if (fileExtension === '.json') {
    return JSON.parse(fs.readFileSync(path.resolve(filePath)));
    }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return yaml.load(fs.readFileSync(path.resolve(filePath)));
    }
    throw new Error('Wrong file extension!');
};
