import * as Hapi from "@hapi/hapi";
import * as Path from "path";
import * as H2o2 from "@hapi/h2o2";
import * as Inert from "@hapi/inert";
import * as Logger from "hapi-pino";
import { ENV, portConfig } from "../config";

export interface IProxy extends Hapi.Server {}

export interface IProxyOptions extends Hapi.ServerOptions {}

export interface IProxyModule<T> {
  options: T;
  extraOptions: IProxyOptions;
  registerOptions(options?: Partial<T>): this;
  setup(server: IProxy): Promise<IProxy>;
}

export interface IProxyModuleOptions {
  baseUri?: string;
  namespace?: string;
}

export interface IClientModuleOptions extends IProxyModuleOptions {
  distDir: string;
  env: string;
}
export interface IClientModule extends IProxyModule<IClientModuleOptions> {}

export interface IServerModuleOptions extends IProxyModuleOptions {}
export interface IServerModule extends IProxyModule<IServerModuleOptions> {}

export const defaultProxyOptions: IProxyOptions = {
  port: portConfig.proxy[ENV],
  host: "localhost",
  routes: {
    files: {
      relativeTo: Path.join(__dirname, "../../public"),
    },
  },
};

console.log(portConfig.proxy, ENV)

export class Proxy {
  proxyServer: IProxy;
  clientModule: IClientModule;
  serverModule: IServerModule;
  options: IProxyOptions;

  constructor(options: IProxyOptions) {
    this.options = Object.assign({}, defaultProxyOptions, options);
  }

  registerClientModule(module: IClientModule, options?: Partial<IClientModuleOptions>): this {
    this.clientModule = module.registerOptions(options);
    this.registerOptions(module.extraOptions);
    return this;
  }

  registerServerModule(module: IServerModule, options?: IServerModuleOptions): this {
    this.serverModule = module.registerOptions(options);
    this.registerOptions(module.extraOptions);
    return this;
  }

  private registerOptions(options: IProxyOptions) {
    Object.assign(this.options, options);
  }

  private async setup(): Promise<IProxy> {
    this.proxyServer = new Hapi.Server(this.options);

    await this.proxyServer.register(H2o2);
    await this.proxyServer.register(Inert);

    await this.proxyServer.register({
      plugin: Logger,
      options: {
        prettyPrint: process.env.NODE_ENV !== "production",
      },
    });

    await this.clientModule.setup(this.proxyServer);
    await this.serverModule.setup(this.proxyServer);

    this.proxyServer.ext("onPreResponse", (_request, h, e) => {
      if (e) {
        return h.file("404.html").code(404);
      }

      return h.continue;
    });

    return this.proxyServer;
  }

  async run() {
    await this.setup().then((server) => server.start());
  }
}
