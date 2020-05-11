import { Proxy, ClientModule, ServerModule } from "@o-w-o/lib-ext--server";

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

(async () => {
  await new Proxy({})
    .registerClientModule(new ClientModule(), {})
    .registerServerModule(new ServerModule())
    .run();
})();
