export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  quote: string;
}

export class User {
  constructor() {}

  static get initialValue(): User {
    return {
      id: "1",
      username: "",
      avatarUrl: "",
      quote:
        "程序员和上帝打赌要开发出更大更好——傻瓜都会用的软件。而上帝却总能创造出更大更傻的傻瓜。所以，上帝总能赢。"
    };
  }
}
