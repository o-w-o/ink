import RxDB, { RxDatabase } from "rxdb";
import { HeroCollection, heroesDbModule } from "./modules/sample";
import {
  TokenCollection,
  tokenMiddlewareHooks,
  tokensDbModule
} from "./modules/tokens";
import { IEpicInitializer } from "@o-w-o/lib-ext--client-store";
import { triggerCacheStore } from "./emitter";

RxDB.plugin(require("pouchdb-adapter-idb"));

type MyDatabaseCollections = {
  heroes: HeroCollection;
  tokens: TokenCollection;
};

type MyDatabase = RxDatabase<MyDatabaseCollections>;

class RxDBToolkit implements IEpicInitializer {
  db: MyDatabase;
  pending: boolean = true;
  emitterTrigger = triggerCacheStore;

  async $o(cb: Function) {
    while (this.pending) {
      await new Promise(resolve => {
        setTimeout(resolve, 100);
      });
    }

    await cb();
  }

  async init() {
    await this.initDb();
    await this.initCollection();

    this.pending = false;

    return this;
  }

  async initDb() {
    this.db = await RxDB.create<MyDatabaseCollections>({
      name: "my_db",
      adapter: "idb",
      multiInstance: true
    });

    return this;
  }

  async initCollection() {
    await this.db.collection(heroesDbModule);
    await this.db.collection(tokensDbModule);

    this.db.tokens.postInsert(tokenMiddlewareHooks.postSave, false);

    this.db.heroes.postInsert(function fun(this: HeroCollection, docData, doc) {
      console.log("insert to " + this.name + "-collection: " + doc.firstName);
    }, false);
  }

  async test() {
    console.log(
      "db Test -> ",
      await this.db.heroes
        .atomicUpsert({
          passportId: "myId",
          firstName: "piotr",
          lastName: "potter",
          age: 5
        })
        .then(v => v.toJSON())
    );
  }

  async destroy() {
    await this.db.destroy();
  }

  get $() {
    return this.db.$;
  }
}

export const dbHelper = new RxDBToolkit();
