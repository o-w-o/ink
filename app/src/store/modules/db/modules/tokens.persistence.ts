import { TokenDocument } from "./tokens";

export class TokenPersistence {
  private token: TokenDocument;

  setToken(token: TokenDocument) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  getAccessToken(): string {
    return this.token ? this.token.accessToken : "";
  }

  getAuthorizationHeader() {
    return this.token
      ? this.token.getAuthorizationHeader()
      : {
          key: "",
          val: ""
        };
  }
}

export const tokenPersistence = new TokenPersistence();
