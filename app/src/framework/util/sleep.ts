export const sleep = async (time = 0) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

export const sleepUntil = async (fn: any) => {
  do {
    await sleep(100);
  } while (!fn());
  return {
    completed: true,
  };
};
