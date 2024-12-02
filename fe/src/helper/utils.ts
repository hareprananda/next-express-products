export const sleep = (ms: number) =>
  new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, ms);
  });

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};
