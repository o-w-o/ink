import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";

export type Hero = {
  passportId: string;
  firstName: string;
  lastName: string;
  age?: number;
};

export type HeroDocMethods = {
  scream: (v: string) => string;
};
export type HeroCollectionMethods = {
  countAllDocuments: () => Promise<number>;
};

export type HeroDocument = RxDocument<Hero, HeroDocMethods>;

export type HeroCollection = RxCollection<
  Hero,
  HeroDocMethods,
  HeroCollectionMethods
>;

export const heroSchema: RxJsonSchema<Hero> = {
  title: "sample schema",
  description: "describes a sample",
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

export const heroDocMethods: HeroDocMethods = {
  scream: function(this: HeroDocument, what: string) {
    return this.firstName + " screams: " + what.toUpperCase();
  },
};

export const heroCollectionMethods: HeroCollectionMethods = {
  countAllDocuments: async function(this: HeroCollection) {
    const allDocs = await this.find().exec();
    return allDocs.length;
  },
};

export const heroesDbModule = {
  name: "heroes",
  schema: heroSchema,
  methods: heroDocMethods,
  statics: heroCollectionMethods,
};
