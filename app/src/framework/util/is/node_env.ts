export enum NODE_ENV {
  DEV = "development",
  PROD = "production",
  TEST = "test",
}

export const getEnv = () => {
  return process.env.NODE_ENV;
};

export const isDev = () => {
  return process.env.NODE_ENV === NODE_ENV.DEV;
};

export const isProd = () => {
  return process.env.NODE_ENV === NODE_ENV.PROD;
};

export const isTest = () => {
  return process.env.NODE_ENV === NODE_ENV.TEST;
};
