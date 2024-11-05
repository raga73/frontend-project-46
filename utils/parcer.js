import path from "node:path";
import fs from "node:fs";

const fileParce = (filePath) => JSON.parse(fs.readFileSync(path.resolve(filePath)));

export { fileParce };