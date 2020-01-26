require("dotenv").config();
const PORT = process.env.PORT || 3000;

const path = require("path");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db/db.json"));

const middlewares = jsonServer.defaults({
  static: "./public"
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use("/api", router);

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON server listening on port ${PORT}!`);
});

module.exports = server;
