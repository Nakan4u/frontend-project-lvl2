import formatKey from './formaters.js';
// eslint-disable-next-line no-prototype-builtins
const isKeyInObj = (obj, key) => obj.hasOwnProperty(key);

const getDiff = (mergedObj, obj1, obj2, type = 'stylish') => {
  const keys = Object.keys(mergedObj).sort();
  const result = keys.reduce((acc, key) => {
    const value = mergedObj[key];
    const isKeyInObj1 = isKeyInObj(obj1, key);
    const isKeyInObj2 = isKeyInObj(obj2, key);
    const newKey = formatKey(type, key).new;
    const prevKey = formatKey(type, key).prev;

    // run recursion if value is 'object' and exist in both objects;
    if (value && typeof value === 'object' && isKeyInObj1 && isKeyInObj2) {
      // console.log('recursion with: ', key, value, obj1[key], obj2[key]);
      acc[key] = getDiff(value, obj1[key], obj2[key]);
      return acc;
    }

    if (isKeyInObj1 && !isKeyInObj2) { // object1 has key that obj2 doesn't;
      acc[prevKey] = obj1[key];
    } else if (!isKeyInObj1 && isKeyInObj2) { // object2 has key that obj1 doesn't;
      acc[newKey] = obj2[key];
    } else if (isKeyInObj1 && isKeyInObj2 && obj1[key] !== obj2[key]) {
      // object2 has key that obj1 doesn't;
      acc[prevKey] = obj1[key];
      acc[newKey] = obj2[key];
    } else { // both object has same key with same value
      acc[key] = value;
    }
    return acc;
  }, {});
  return result;
};

export default getDiff;
