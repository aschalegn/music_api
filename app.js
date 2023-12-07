import express from "express";
import { routes } from "./api/index.js";
import { AppError } from "./utils/Error.js";
import { logger, rotatingLogger } from "./utils/Logger.js";
import { morganMiddleware } from "./middlewares/morganMiddleware.js";
const app = express();

app.use(express.json()); //parsing body from user on methods()
app.use(express.urlencoded({ extended: false }));

app.use(morganMiddleware);

app.use("/api/v1/users", routes.user);
app.use("/api/v1/artists", routes.artist);

// log the error
app.use((error, req, res, next) => {
    // console.log(error);
    rotatingLogger.error(error.message);
    if (error instanceof AppError) {
        // logs
        res.status(error.httpStaus).send(error.message);
        return;
    };
    // send email to admins
    res.status(400).send("Some error happended, try letter");
});


export { app };