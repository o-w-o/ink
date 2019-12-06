#!/usr/bin/env node
const yargs = require("yargs");

const { argv } = yargs.options({
  target: { type: "string", default: "server" },
});

let version = "latest";

switch (argv.target) {
  case "server": {
    version = require("../src/server/package.json").version;
  }
  case "client": {
    version = require("../src/client/package.json").version;
  }
}

console.log(version);
