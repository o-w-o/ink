import proxy from "http-proxy-middleware";

export default function(app) {
  app.use(
    "/api",
    proxy({
      target: "http://localhost:8084",
      changeOrigin: true,
    })
  );
}
