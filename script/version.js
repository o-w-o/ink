#!/usr/bin/env node
const yargs = require("yargs");

const { argv } = yargs.options({
  target: { type: "string", default: "server" },
});

let version;

switch (argv.target) {
  case "server": {
    version = require("../src/server/package.json").version;
    break;
  }
  case "client": {
    version = require("../src/client/package.json").version;
    break;
  }
  default: {
    version = "latest"
  }
}

console.log(version);
