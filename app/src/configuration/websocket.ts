import { EnvEnum, getEnv } from "./env";
import { apiBaseUrl } from "./proxy";

export function remoteUrl(uid?: string): string {
  return getEnv() === EnvEnum.PRODUCTION
    ? `wss://${apiBaseUrl()}/websocket/${uid}`
    : `ws://${apiBaseUrl()}/websocket/${uid || Math.floor(Math.random() * 64)}`;
}
