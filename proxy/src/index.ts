import { Proxy } from "./modules/Proxy";
import { ClientModule } from "./modules/client/ClientModule";
import { ServerModule } from "./modules/server/ServerModule";

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

(async () => {
  await new Proxy({})
    .registerClientModule(new ClientModule(), {})
    .registerServerModule(new ServerModule())
    .run();
})();
