import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filePath) => {
  const contentFile = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', filePath), 'utf8');
  // const formatFile = path.extname(filePath).slice(1);
  return contentFile;
};

const getJSONDiff = (file1, file2) => {
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const clonedObj1 = _.clone(obj1);
  const clonedObj2 = _.clone(obj2);
  const mergedObj = _.merge(clonedObj1, clonedObj2);
  const isKeyInObj = (obj, key) => obj.hasOwnProperty(key);

  const result = Object.keys(mergedObj).sort().reduce((acc, key) => {
    const value = mergedObj[key];
    const isKeyInObj1 = isKeyInObj(obj1, key);
    const isKeyInObj2 = isKeyInObj(obj2, key);
    const positiveKey = `+ ${key}`;
    const negativeKey = `- ${key}`;
    // object1 has key that obj2 doesn't;
    if (isKeyInObj1 && !isKeyInObj2) {
      acc[negativeKey] = obj1[key];
    }
    // object2 has key that obj1 doesn't;
    else if (!isKeyInObj1 && isKeyInObj2) {
      acc[positiveKey] = obj2[key];
    }
    // object2 has key that obj1 doesn't;
    else if (isKeyInObj1 && isKeyInObj2 && obj1[key] !== obj2[key]) {
      acc[negativeKey] = obj1[key];
      acc[positiveKey] = obj2[key];
    }
    // both object has same key with same value
    else {
      acc[key] = value;
    }
    return acc;
  }, {})
  return JSON.stringify(result);
}

export default (filepath1, filepath2) => {
  try {
    const data1 = readFile(filepath1);
    const data2 = readFile(filepath2);
    return getJSONDiff(data1, data2);
  }
  catch (e) {
    console.log("problem with read file", e)
  }
}