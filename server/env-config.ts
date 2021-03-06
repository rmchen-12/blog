import { config } from "dotenv";

config({ path: ".env" });

const ENVIRONMENT = process.env.NODE_ENV;
const dev = ENVIRONMENT !== "production";

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SERVER_PORT = dev
  ? process.env.DEVELOPMENT_PORT
  : process.env.PRODUCTION_PORT;
