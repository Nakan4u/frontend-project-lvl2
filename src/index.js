import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { fileURLToPath } from 'url';

import parseFile from './parsers.js';
import formatFile from './formaters/index.js';
import getDiff from './getDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);

export const readFile = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

export default (filepath1, filepath2, format = 'stylish', stringify = true) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const parsedFile1 = parseFile(filepath1, file1);
  const parsedFile2 = parseFile(filepath1, file2);
  const clonedObj1 = _.cloneDeep(parsedFile1);
  const clonedObj2 = _.cloneDeep(parsedFile2);
  const mergedObj = _.merge(clonedObj1, clonedObj2);
  const diff = getDiff(mergedObj, parsedFile1, parsedFile2);
  const result = formatFile(diff, format);
  return stringify ? JSON.stringify(result) : result;
};
