#!/usr/bin/env node

let port = 3000;
const execa = require('execa')

execa.commandSync('npm')

console.log(port);
