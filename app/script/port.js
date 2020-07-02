#!/usr/bin/env node

console.log(process.env.NODE_ENV === "draft" ? 3001 : 3000);
