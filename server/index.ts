import next from "next";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import compression from "compression";
import lusca from "lusca";
import { config } from "dotenv";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import bluebird from "bluebird";
import passport from "passport";
import logger from "./util/logger";
import { MONGODB_URI, SERVER_PORT, SESSION_SECRET } from "./env-config";
import renderWithCache from "./util/renderWithCache";

import Main from "./main";
import Admin from "./admin";

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

  server.use(express.json());
  server.use(compression());
  server.use(bodyParser());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: SESSION_SECRET!,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // expires in 7 days
      },
      store: new MongoStore({
        autoReconnect: true,
        url: MONGODB_URI!,
        ttl: 7 * 24 * 60 * 60 // save session 7 days
      })
    })
  );
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(lusca.xframe("SAMEORIGIN"));
  server.use(lusca.xssProtection(true));

  renderWithCache({ server, app });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.use("/", Main);
  server.use("/admin", Admin);

  server.listen(port, (err: any) => {
    if (err) throw err;
    logger.info(
      `> Ready on http://localhost:${port} in ${process.env.NODE_ENV} mode`
    );
  });
});
