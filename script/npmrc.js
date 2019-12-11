#!/usr/bin/env node

var getAuthToken = require("registry-auth-token");

// Get auth token and type for default `registry` set in `.npmrc`
console.log(getAuthToken()); // {token: 'someToken', type: 'Bearer'}
