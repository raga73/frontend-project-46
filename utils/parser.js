import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'js-yaml';

export default (filePath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const getPath = (filename) => path.join(filename);

  const fileExtension = path.extname(getPath(filePath));

  if (fileExtension === '.json') {
    return JSON.parse(fs.readFileSync(getPath(filePath)));
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return yaml.load(fs.readFileSync(getPath(filePath)));
  }
  throw new Error(`Wrong file extension ${fileExtension}!`);
};
