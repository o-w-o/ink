import { Record, RecordOf } from "immutable";

export interface IProject {
  name: string;
  uuid: string;
}

export type IProjectRecord = RecordOf<IProject>;

export const ProjectRecord: Record.Factory<IProject> = Record<IProject>({
  name: "",
  uuid: "",
});

export interface IUser {
  id: string;
  username: string;
  avatarUrl: string;
  projects: [string, string][];
  quote: string;
}

export type IUserRecord = RecordOf<IUser>;

export const UserRecord: Record.Factory<IUser> = Record<IUser>({
  id: "1",
  username: "",
  avatarUrl: "",
  projects: [
    ["11", "12"],
    ["11", "12"],
  ],
  quote:
    "程序员和上帝打赌要开发出更大更好——傻瓜都会用的软件。而上帝却总能创造出更大更傻的傻瓜。所以，上帝总能赢。",
});
