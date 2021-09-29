import formatter from './formaters/index.js';
// eslint-disable-next-line no-prototype-builtins
export const isKeyInObj = (obj, key) => obj?.hasOwnProperty(key);

const getDiff = (mergedObj, obj1, obj2, type = 'stylish') => {
  const keys = Object.keys(mergedObj).sort();
  const diffObj = keys.reduce((acc, key) => {
    const value = mergedObj[key];
    const isKeyInObj1 = isKeyInObj(obj1, key);
    const isKeyInObj2 = isKeyInObj(obj2, key);

    // run recursion if value is 'object' and exist in both objects;
    if (value && typeof value === 'object' && isKeyInObj1 && isKeyInObj2) {
      // console.log('recursion with: ', key, value, obj1[key], obj2[key]);
      acc[key] = getDiff(value, obj1[key], obj2[key]);
      return acc;
    }

    if (isKeyInObj1 && !isKeyInObj2) { // object1 has key that obj2 doesn't;
      acc[key] = { old: obj1[key] };
    } else if (!isKeyInObj1 && isKeyInObj2) { // object2 has key that obj1 doesn't;
      acc[key] = { new: obj2[key] };
    } else if (isKeyInObj1 && isKeyInObj2 && obj1[key] !== obj2[key]) {
      // object2 has key that obj1 doesn't;
      acc[key] = {
        old: obj1[key],
        new: obj2[key],
      };
    } else { // both object has same key with same value
      acc[key] = value;
    }
    return acc;
  }, {});
  const formattedResult = formatter(diffObj, type);
  return formattedResult;
};

export default getDiff;
