import winston from "winston";
import { createLogger, format } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss" }), myFormat),
  level: "debug",
  transports: [
    new winston.transports.File({
      filename: "debug.log",
      level: "debug"
    }),
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug"
    })
  ]
});

export default logger;
