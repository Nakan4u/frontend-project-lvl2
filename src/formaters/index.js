import stylish from './stylish.js';
import plain from './plain.js';

export default (type, key) => {
  if (type === 'stylish') {
    return stylish(key);
  }
  return plain(key);
};
