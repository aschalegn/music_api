import { Worker } from "worker_threads";
import express from "express";
import { routes } from "./api/index.js";
import { AppError } from "./utils/Error.js";
import { logger, rotatingLogger } from "./utils/Logger.js";
import { morganMiddleware } from "./middlewares/morganMiddleware.js";
const app = express();

app.use(express.json()); //parsing body from user on methods()
app.use(express.urlencoded({ extended: false }));

app.use(morganMiddleware);

const count = async (num) => {
    // setTimeout
    // setInterval
    // setImmediate
    // promise

    let counter = 0;
    const result = await new Promise((resolve, reject) => {
        // let inCounter = 0;
        // for (let i = 0; i < num; i++) {
        //     inCounter += 1;
        // }
        // resolve(inCounter);
        setTimeout(() => {
            resolve(10)
        }, 30 * 1000);
    });
    // console.log(resulte);
    return 0;
};

// async await => then catch
app.get("/test", async (req, res,) => {
    // using more threads
    const num = 20_000_000_000;
    console.time("counter");
    let counter = await count(num);
    res.send({ counter });
    console.timeEnd("counter");
});

app.get("/algo", (req, res) => {
    const num = 20_000_000_000;
    const worker = new Worker("./multithrads/counter", { workerData: { number: num } });
    worker.on("message", data => {
        res.send({ data });
    });
    worker.on("error", error => {
        res.send("error");
    });
});

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