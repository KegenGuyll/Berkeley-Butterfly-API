const firstCharCap = (str: string) => {
  const newStr = str.charAt(0).toUpperCase() + str.slice(1);

  return newStr;
};

// eslint-disable-next-line import/prefer-default-export
export { firstCharCap };
