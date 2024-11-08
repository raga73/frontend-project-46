import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';

export default (filePath) => {
  if (filePath.endsWith('json')) {
    return JSON.parse(fs.readFileSync(path.resolve(filePath)));
    }
  if (filePath.endsWith('yml') || filePath.endsWith('yaml')) {
    return  yaml.load(fs.readFileSync(path.resolve(filePath)))
    }
    throw new Error('Wrong file extension!');
}
