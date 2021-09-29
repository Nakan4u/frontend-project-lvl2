import { isKeyInObj } from '../getDiff.js';

export default (diffObj) => {
  const keys = Object.keys(diffObj).sort();
  const result = keys.reduce((acc, key) => {
    const value = diffObj[key];
    const newValue = isKeyInObj(value, 'new');
    const oldValue = isKeyInObj(value, 'old');
    const newKey = `+ ${key}`;
    const oldKey = `- ${key}`;

    if (newValue) {
      acc[newKey] = value.new;
    }
    if (oldValue) {
      acc[oldKey] = value.old;
    }
    if (!newValue && !oldValue) {
      acc[key] = value;
    }
    return acc;
  }, {});
  return result;
};
