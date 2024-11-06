import path from 'node:path';
import fs from 'node:fs';

export default (filePath) => JSON.parse(fs.readFileSync(path.resolve(filePath)));
