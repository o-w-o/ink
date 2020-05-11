export enum EnvEnum {
  PRODUCTION = "production",
  DEVELOPMENT = "development"
}

export function getEnv(): EnvEnum {
  return process.env.NODE_ENV === EnvEnum.PRODUCTION
    ? EnvEnum.PRODUCTION
    : EnvEnum.DEVELOPMENT;
}
