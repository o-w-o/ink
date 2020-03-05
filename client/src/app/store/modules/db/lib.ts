import RxDB, { RxCollection, RxDatabase, RxDocument, RxJsonSchema } from "rxdb";

RxDB.plugin(require("pouchdb-adapter-idb"));

type Hero = {
  passportId: string;
  firstName: string;
  lastName: string;
  age?: number;
};

type HeroDocMethods = {
  scream: (v: string) => string;
};

type HeroCollectionMethods = {
  countAllDocuments: () => Promise<number>;
};

type HeroDocument = RxDocument<Hero, HeroDocMethods>;

type HeroCollection = RxCollection<Hero, HeroDocMethods, HeroCollectionMethods>;

type MyDatabaseCollections = {
  heroes: HeroCollection;
};

type MyDatabase = RxDatabase<MyDatabaseCollections>;

class RxDBHelper {
  db!: MyDatabase;
  pending: boolean = true;

  async $o(cb: Function) {
    while (this.pending) {
      await new Promise((resolve) => {
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
      multiInstance: true,
    });

    return this;
  }

  async initCollection() {
    const heroSchema: RxJsonSchema<Hero> = {
      title: "human schema",
      description: "describes a human being",
      version: 0,
      keyCompression: true,
      type: "object",
      properties: {
        passportId: {
          type: "string",
          primary: true,
        },
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        age: {
          type: "integer",
        },
      },
      required: ["firstName", "lastName"],
    };

    const heroDocMethods: HeroDocMethods = {
      scream: function(this: HeroDocument, what: string) {
        return this.firstName + " screams: " + what.toUpperCase();
      },
    };

    const heroCollectionMethods: HeroCollectionMethods = {
      countAllDocuments: async function(this: HeroCollection) {
        const allDocs = await this.find().exec();
        return allDocs.length;
      },
    };

    await this.db.collection({
      name: "heroes",
      schema: heroSchema,
      methods: heroDocMethods,
      statics: heroCollectionMethods,
    });

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
          age: 5,
        })
        .then((v) => v.toJSON())
    );
  }

  async destroy() {
    await this.db.destroy();
  }

  $() {
    return this.db.$;
  }
}

export const dbHelper = new RxDBHelper();
