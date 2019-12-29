import {
  IClientModule,
  IClientModuleOptions,
  IProxy,
  IProxyOptions,
} from "../Proxy";
import * as Hapi from "@hapi/hapi";
import * as Path from "path";
import { proxyType, proxyUri } from "../../utils/proxy";
import { ENV, NodeEnvEnum, portConfig } from "../../config";

export class ClientModule implements IClientModule {
  static get defaultOptions(): IClientModuleOptions {
    return {
      port: portConfig.client[ENV],
      baseUri: `http://localhost:${portConfig.client[ENV]}`,
      namespace: "",
      distDir: Path.join(__dirname, "../../public"),
      env: ENV ? ENV.trim() : NodeEnvEnum.DEVELOPMENT,
    };
  }

  extraOptions: IProxyOptions = {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "../../public"),
      },
    },
  };

  options: IClientModuleOptions;
  registerOptions(options?: IClientModuleOptions) {
    this.options = Object.assign({}, ClientModule.defaultOptions, options);
    return this;
  }

  registerRouteToProxy(server: IProxy) {
    const { options } = this;

    server.route({
      method: "GET",
      path: "/{proxyPath*}",
      options: {},
      handler: {
        proxy: {
          mapUri: async function(req) {
            const { base, proxyPath, query } = proxyUri(req, options);

            const path =
              (req.headers["accept"] || "").indexOf("text/html") < 0 ||
              req.path.startsWith("/sockjs-node/")
                ? proxyPath
                : "/";

            return {
              uri: base + path + query,
            };
          },
          onResponse: async function(this: Hapi.RouteOptions, err, res) {
            if (err) {
              return err;
            }
            return res;
          },
        },
      },
    });
  }
  registerRouteToStatic(server: IProxy) {
    const { options } = this;

    server.route({
      method: "GET",
      path: "/",
      handler: function(_req, h) {
        return h.file(`${options.distDir}/index.html`);
      },
    });

    server.route({
      method: "GET",
      path: "/{proxyPath*}",
      handler: function(req, h) {
        const { type, hasSuffix } = proxyType(req);
        req.logger.info(`${options.distDir}/${req.params.proxyPath}`, type);

        if (hasSuffix) {
          return h.file(`${options.distDir}/${req.params.proxyPath}`);
        } else {
          return h.file(`${options.distDir}/index.html`);
        }
      },
    });
  }

  async setup(server: IProxy): Promise<IProxy> {
    const env = ENV || this.options.env;
    server.logger().info("registerRoute NODE_ENV -> {}", env);

    switch (env) {
      case "development": {
        this.registerRouteToProxy(server);
        break;
      }
      case "production": {
        this.registerRouteToStatic(server);
        break;
      }
      default: {
        server.logger().error("未知的 NODE_ENV -> {}", env);
      }
    }
    return server;
  }
}
