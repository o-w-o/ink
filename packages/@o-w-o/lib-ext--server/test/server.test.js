"use strict";

const { script } = require("@hapi/lab");
const { expect } = require("@hapi/code");
const { afterEach, beforeEach, describe, it } = (exports.lab = script());

const { Proxy, ClientModule, ServerModule } = require("../dist");

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

const init = () => {
  return new Proxy({})
    .registerClientModule(new ClientModule(), {})
    .registerServerModule(new ServerModule());
};

describe("GET /", () => {
  let proxy;

  beforeEach(async () => {
    proxy = new Proxy({})
      .registerClientModule(new ClientModule(), {})
      .registerServerModule(new ServerModule());
    await proxy.run();
  });

  afterEach(async () => {
    await proxy.proxyServer.stop();
  });

  it("responds with 404", async () => {
    const res = await proxy.proxyServer.inject({
      method: "get",
      url: "/"
    });
    expect(res.statusCode).to.equal(404);
  });
});
