#!/usr/bin/env node

let port = 3000;

if (process.env.NODE_ENV === "draft") {
  port = 3001;
}

console.log(port);
