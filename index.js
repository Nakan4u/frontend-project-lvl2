import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
  const contentFile = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', filePath), 'utf8');
  // const formatFile = path.extname(filePath).slice(1);
  return contentFile;
};

export default (filepath1, filepath2) => {
  try {
    const data1 = readFile(filepath1);
    const data2 = readFile(filepath2);
    console.log(data1, data2);
  }
  catch (e) {
    console.log("problem with read file", e)
  }
}