import { EnvEnum, getEnv } from "./env";

export function apiBaseUrl(): string {
  return getEnv() === EnvEnum.PRODUCTION ? "api.o-w-o.ink" : "localhost:8080";
}
