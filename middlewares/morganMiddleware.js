import morgan from "morgan";
import { logger, rotatingLogger } from "../utils/Logger.js";

//role = http request

export const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            write: message => rotatingLogger.http(message)
        }
    }
);