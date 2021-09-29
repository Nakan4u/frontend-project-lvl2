import { isKeyInObj } from '../getDiff.js';

const format = (diffObj) => {
  const keys = Object.keys(diffObj).sort();
  const result = keys.reduce((acc, key) => {
    const value = diffObj[key];
    const isNewValue = isKeyInObj(value, 'new');
    const isOldValue = isKeyInObj(value, 'old');
    const newKey = `+ ${key}`;
    const oldKey = `- ${key}`;

    if (value && typeof value === 'object' && !isNewValue && !isOldValue) {
      const data = format(value);
      acc[key] = data;
      return acc;
    }
    if (!isNewValue && !isOldValue && value) {
      acc[key] = value;
    }
    if (isOldValue) {
      acc[oldKey] = value.old;
    }
    if (isNewValue) {
      acc[newKey] = value.new;
    }
    return acc;
  }, {});
  return result;
};

export default format;
