/* eslint-disable import/no-cycle */
import stylish from './stylish.js';
import plain from './plain.js';

export default (diffObj, type) => {
  if (type === 'stylish') {
    return stylish(diffObj);
  }
  if (type === 'plain') {
    return plain(diffObj);
  }
  return diffObj;
};
