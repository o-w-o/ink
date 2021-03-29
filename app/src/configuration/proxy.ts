import { EnvEnum, getEnv } from "./env";

export function apiBaseUrl(): string {
  return getEnv() === EnvEnum.PRODUCTION ? "o-w-o.ink/api" : "localhost:8080";
}
