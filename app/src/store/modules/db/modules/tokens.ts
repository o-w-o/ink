import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { tokenPersistence } from "./tokens.persistence";

class TokenConfig {
  public static readonly header: string = "Authorization";
  public static readonly mark: string = "Bearer";
}

export interface Token {
  accessToken?: string;
  refreshToken?: string;
  sts?: string;
}

export class Token {}

export type TokenDocMethods = {
  getAuthorizationHeader: () => {
    key: string;
    val: string;
  };
};

export type TokenCollectionMethods = {
  fetch: () => Promise<Token>;
  countAllDocuments: () => Promise<number>;
};

export type TokenDocument = RxDocument<Token, TokenDocMethods>;

export type TokenCollection = RxCollection<
  Token,
  TokenDocMethods,
  TokenCollectionMethods
>;

export const tokenSchema: RxJsonSchema<Token> = {
  title: "token schema",
  description: "存储令牌",
  version: 0,
  keyCompression: true,
  type: "object",
  properties: {
    accessToken: {
      type: "string",
      primary: true,
    },
    refreshToken: {
      type: "string",
    },
    sts: {
      type: "string",
    },
  },
};

export const tokenDocMethods: TokenDocMethods = {
  getAuthorizationHeader: function (this: TokenDocument) {
    return {
      key: TokenConfig.header,
      val: `${TokenConfig.mark} ${this.accessToken}`,
    };
  },
};

export const tokenCollectionMethods: TokenCollectionMethods = {
  fetch: async function (this: TokenCollection) {
    const list = await this.find().exec();
    return list[0];
  },
  countAllDocuments: async function (this: TokenCollection) {
    const allDocs = await this.find().exec();
    return allDocs.length;
  },
};

export const tokenMiddlewareHooks = {
  postSave: function (token: Token, tokenDocument: TokenDocument) {
    tokenPersistence.setToken(tokenDocument);
  },
};

export const tokensDbModule = {
  name: "tokens",
  schema: tokenSchema,
  methods: tokenDocMethods,
  statics: tokenCollectionMethods,
};
