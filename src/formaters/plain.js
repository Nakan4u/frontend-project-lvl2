import { isKeyInObj } from '../getDiff.js';

const maxDepth = 10;
const isComplexValue = (val) => typeof val === 'object';
const complexValue = '[complex value]';
// eslint-disable-next-line no-nested-ternary
const getValue = (val) => ((val && isComplexValue(val)) ? complexValue : typeof val === 'string' ? `'${val}'` : val);

const format = (diffObj, parentKey) => {
  const keys = Object.keys(diffObj).sort();
  const result = keys.reduce((acc, key) => {
    const value = diffObj[key];
    const isNewValue = isKeyInObj(value, 'new');
    const isOldValue = isKeyInObj(value, 'old');
    const newValue = getValue(value?.new);
    const oldValue = getValue(value?.old);
    const propName = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === 'object' && !isNewValue && !isOldValue) {
      const data = format(value, propName);
      acc.push(data);
    }
    if (isOldValue && isNewValue) {
      acc.push(`Property '${propName}' was updated. From ${oldValue} to ${newValue}`);
    }
    if (isNewValue && !isOldValue) {
      acc.push(`Property '${propName}' was added with value: ${newValue}`);
    }
    if (!isNewValue && isOldValue) {
      acc.push(`Property '${propName}' was removed`);
    }
    return acc;
  }, []);
  return result.flat(maxDepth).join('\n');
};

export default format;
