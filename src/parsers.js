import path from 'path';
import yaml from 'js-yaml';

export default (filePath, file) => {
  const format = path.extname(filePath);
  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(file);
};
