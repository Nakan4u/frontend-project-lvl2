import { readFile, getJSONDiff } from "./src/index.js"

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