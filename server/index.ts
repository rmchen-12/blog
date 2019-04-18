import next from "next";
import express from "express";
import session from "express-session";
import { config } from "dotenv";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import bluebird from "bluebird";
import logger from "./util/logger";
import { MONGODB_URI, SERVER_PORT, SESSION_SECRET } from "./env-config";

// 加载配置文件
config({ path: ".env" });

const port = parseInt(
  (process.env.PORT as string) || (SERVER_PORT as string),
  10
);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const MongoStore = mongo(session);
(mongoose as any).Promise = bluebird;
mongoose
  .connect(MONGODB_URI!, { useNewUrlParser: true })
  .then(() => {
    logger.info("成功连接MongoDB");
  })
  .catch(err => {
    logger.info("MongoDB连接出错" + err);
  });

app.prepare().then(() => {
  const server = express();

  server.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: SESSION_SECRET!,
      store: new MongoStore({
        autoReconnect: true,
        url: MONGODB_URI!
      })
    })
  );

  server.get("/", (req, res) => {
    app.render(req, res, "/home");
  });

  server.get("/admin", (req, res) => {
    app.render(req, res, "/admin/tag");
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err: any) => {
    if (err) throw err;
    logger.info(
      `> Ready on http://localhost:${port} in ${process.env.NODE_ENV} mode`
    );
  });
});
