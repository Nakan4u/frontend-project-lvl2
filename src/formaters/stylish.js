import { isKeyInObj } from '../getDiff.js';

const format = (diffObj) => {
  const keys = Object.keys(diffObj).sort();
  const result = keys.reduce((acc, key) => {
    const value = diffObj[key];
    const newValue = isKeyInObj(value, 'new');
    const oldValue = isKeyInObj(value, 'old');
    const newKey = `+ ${key}`;
    const oldKey = `- ${key}`;

    if (!newValue && !oldValue && value) {
      acc[key] = value;
    }
    if (oldValue) {
      acc[oldKey] = value.old;
    }
    if (newValue) {
      acc[newKey] = value.new;
    }
    return acc;
  }, {});
  return result;
};

export default format;
