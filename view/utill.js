export const debounce = (func, delay = 700) => {
  let timeOutId;
  return (...arg) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func.apply(null, arg);
    }, delay);
  };
};
