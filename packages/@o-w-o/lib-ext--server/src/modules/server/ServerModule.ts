import * as Hapi from "@hapi/hapi";
import {
  IProxy,
  IServerModule,
  IServerModuleOptions,
  IProxyOptions
} from "../Proxy";
import { proxyUri } from "../../utils/proxy";
import { ENV, portConfig } from "../../config";

export class ServerModule implements IServerModule {
  static get defaultOptions(): IServerModuleOptions {
    return {
      baseUri: `http://localhost:${portConfig.server[ENV]}`,
      namespace: "api"
    };
  }
  extraOptions: IProxyOptions = {};

  options: IServerModuleOptions;
  registerOptions(options?: IServerModuleOptions) {
    this.options = Object.assign({}, ServerModule.defaultOptions, options);
    return this;
  }

  async setup(server: IProxy): Promise<IProxy> {
    const { options } = this;
    server.route({
      method: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
      path: "/api/{proxyPath*}",
      options: {},
      handler: {
        proxy: {
          mapUri: async function(req) {
            const { uri } = proxyUri(req, options);
            return {
              uri,
              headers: Object.assign(req.headers, {})
            };
          },
          onResponse: async function(this: Hapi.RouteOptions, err, res) {
            if (err) {
              return err;
            }
            return res;
          }
        }
      }
    });

    return server;
  }
}
