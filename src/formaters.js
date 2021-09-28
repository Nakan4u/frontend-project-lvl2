export default (type, key) => {
  if (type === 'stylish') {
    return {
      prev: `- ${key}`,
      new: `+ ${key}`,
    };
  }
  return {
    prev: `prev ${key}`,
    new: `new ${key}`,
  };
};
