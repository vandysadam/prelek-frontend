export const cleanObj = (obj) => {
  const cleanedObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      cleanedObj[key] = cleanObj(obj[key]);
    } else if (obj[key] != null && obj[key] !== '') {
      cleanedObj[key] = obj[key];
    }
  });
  return cleanedObj;
};
