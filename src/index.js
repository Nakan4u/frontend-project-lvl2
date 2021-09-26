import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { fileURLToPath } from 'url';

import parseFile from './parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);

export const readFile = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

export const genDiff = (obj1, obj2) => {
  const clonedObj1 = _.clone(obj1);
  const clonedObj2 = _.clone(obj2);
  const mergedObj = _.merge(clonedObj1, clonedObj2);
  // eslint-disable-next-line no-prototype-builtins
  const isKeyInObj = (obj, key) => obj.hasOwnProperty(key);

  const result = Object.keys(mergedObj).sort().reduce((acc, key) => {
    const value = mergedObj[key];
    const isKeyInObj1 = isKeyInObj(obj1, key);
    const isKeyInObj2 = isKeyInObj(obj2, key);
    const positiveKey = `+ ${key}`;
    const negativeKey = `- ${key}`;

    if (isKeyInObj1 && !isKeyInObj2) { // object1 has key that obj2 doesn't;
      acc[negativeKey] = obj1[key];
    } else if (!isKeyInObj1 && isKeyInObj2) { // object2 has key that obj1 doesn't;
      acc[positiveKey] = obj2[key];
    } else if (isKeyInObj1 && isKeyInObj2 && obj1[key] !== obj2[key]) {
      // object2 has key that obj1 doesn't;
      acc[negativeKey] = obj1[key];
      acc[positiveKey] = obj2[key];
    } else { // both object has same key with same value
      acc[key] = value;
    }
    return acc;
  }, {});
  return JSON.stringify(result);
};

export default (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const parsedFile1 = parseFile(filepath1, file1);
  const parsedFile2 = parseFile(filepath1, file2);
  return genDiff(parsedFile1, parsedFile2);
};
