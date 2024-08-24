export const domainNameRemover = (url: string): string => {
  const regex = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/.*)?$/i;
  const match = url.match(regex);
  if (match && match[2]) {
    return match[3] || '';
  } else {
    return url;
  }
};
