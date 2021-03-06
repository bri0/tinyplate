module.exports = {
  get: (obj, path) => {
    if (!obj || !path) return undefined;
    const paths = path.split('.');
    let current = obj;
    for (let i = 0; i < paths.length; ++i) {
      if (current[paths[i]] === undefined) {
        return undefined;
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  },
  isFunction: (f) => f && {}.toString.call(f) === '[object Function]',
};
