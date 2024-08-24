export const timeParser = (time: Date | string) => {
  const formatedTime = new Date(time);
  const result = `${formatedTime.getUTCDate()}, ${formatedTime.toLocaleString(
    "en-US",
    {
      month: "short",
    }
  )} ${formatedTime.getUTCFullYear()} (${formatedTime.toLocaleTimeString()})`;
  return result;
};

// do like time parser but use format like "d, month yyyy"
export const timeParser2 = (time: Date | string) => {
  const formatedTime = new Date(time);
  const result = `${formatedTime.getUTCDate()}, ${formatedTime.toLocaleString(
    "en-US",
    {
      month: "long",
    }
  )} ${formatedTime.getUTCFullYear()}`;
  return result;
};
