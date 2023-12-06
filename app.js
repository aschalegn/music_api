import express from "express";
import { routes } from "./api/index.js";
import { AppError } from "./utils/Error.js";

const app = express();

app.use(express.json()); //parsing body from user on methods()

app.use("/api/v1/users", routes.user);
app.use("/api/v1/artists", routes.artist);

// log the error
app.use((error, req, res, next) => {
    console.log(error);
    console.log(req.url);
    if (error instanceof AppError) {
        // logs
        res.status(error.httpStaus).send(error.message);
        return;
    };
    // send email to admins
    res.status(400).send("Some error happended, try letter");
});

// const arr = ["skfjnvkdj", "sndkj", 474];
// const [first, second] = arr;
// console.log(first, second);
export { app };