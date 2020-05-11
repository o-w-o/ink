export enum NodeEnvEnum {
  DEVELOPMENT = "development",
  DRAFT = "draft",
  PRODUCTION = "production"
}

export const ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV.trim()
  : NodeEnvEnum.DEVELOPMENT;

/**
 *
 * 端口配置
 * @export proxy 代理
 * @export client 客户端
 * @export server 服务端
 *
 * @interface IPortConfig
 */
export interface IPortConfig {
  client: {
    [key in NodeEnvEnum]: number;
  };
  proxy: {
    [key in NodeEnvEnum]: number;
  };
  server: {
    [key in NodeEnvEnum]: number;
  };
}

export const portConfig: IPortConfig = {
  client: {
    [NodeEnvEnum.DEVELOPMENT]: 3000,
    [NodeEnvEnum.DRAFT]: 3001,
    [NodeEnvEnum.PRODUCTION]: 3000
  },
  proxy: {
    [NodeEnvEnum.DEVELOPMENT]: 8084,
    [NodeEnvEnum.DRAFT]: 8085,
    [NodeEnvEnum.PRODUCTION]: 8084
  },
  server: {
    [NodeEnvEnum.DEVELOPMENT]: 8080,
    [NodeEnvEnum.DRAFT]: 8081,
    [NodeEnvEnum.PRODUCTION]: 8080
  }
};
