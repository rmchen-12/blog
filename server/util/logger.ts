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
      maxsize: 4096
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export default logger;
