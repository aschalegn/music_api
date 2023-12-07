import winston, { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import MySQLWinston from "winston-mysql";
import { config } from "../config/index.js";

const winstonLevels = {
    error: 0,
    info: 2,
    warn: 1,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

const { combine, json, timestamp } = format;

export const logger = createLogger({
    level: 'http',
    format: combine(timestamp(), json()),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "logs/error.log",
            level: "error"
        }),
        new transports.File({
            filename: "logs/combied.log",
        })
    ]
});

const mysqlConfig = {
    ...config.database,
    database: config.database.dbName,
    table: 'logging',
};
delete mysqlConfig.dbName;

const rotationConfig = new transports.DailyRotateFile({
    filename: 'logs/errors-%DATE%.log',
    datePattern: 'YYYT-MM-DD',
    maxFiles: '30d'
});

export const rotatingLogger = createLogger({
    level: 'http',
    format: json(),
    transports: [
        rotationConfig,
        new MySQLWinston(mysqlConfig)
    ]
});

rotationConfig.on("rotate", (oldFile, newFile) => {
    // send email
    // send notification
});

winston.loggers.add("users-service", {
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "logs/error.log",
        })
    ]
});

const userLogger = winston.loggers.get("users-service");
// userLogger.error(".kdz jdh");
// logger.info("this is info");
// logger.error("this is Error");
// logger.http("this is Error");