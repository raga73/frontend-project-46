import fs from 'node:fs';
import yaml from 'js-yaml';

export default (file, fileExtension) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fs.readFileSync(file));
    case '.yml':
    case '.yaml':
      return yaml.load(fs.readFileSync(file));
    default:
      throw new Error(`Wrong file extension ${fileExtension}!`);
  }
};
