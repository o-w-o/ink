import * as Hapi from "@hapi/hapi";
import { IProxyModuleOptions } from "../modules/Proxy";
import * as Qs from "qs";

export const proxyUri = (req: Hapi.Request, options: IProxyModuleOptions) => {
  const base = `${options.baseUri}/${options.namespace}`;
  const proxyPath = req.params.proxyPath;
  const uri = `${base}/${proxyPath}`;
  const query = Qs.stringify(req.query, { addQueryPrefix: true });
  const path = uri + query;

  req.logger.info(`[API proxy] uri -> ${uri}, query -> ${query}`);

  return {
    base,
    proxyPath,
    uri,
    query,
    path,
  };
};

export const proxyType = (req: Hapi.Request) => {
  const { proxyPath } = req.params;
  const arr: string[] = proxyPath ? proxyPath.split(".") : [];
  const type = Array.isArray(arr) && arr.length !== 1 ? arr[arr.length - 1] : null;
  return {
    hasSuffix: !!type,
    type,
  };
};
