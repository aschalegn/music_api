import { app } from "./app.js";
import dotenv from "dotenv";
import http from "http";
import os from "os";


dotenv.config();

const cpus = os.cpus();
// console.log(cpus.length);

// const server = http.createServer();

// server.on("request", (req, res) => { 

// });

// setTimeout
// setInterval
// setImmediate
// promise

// console.log("log 1");
// while (true) {}

// setTimeout(() => { console.log("log 2"); }, 3000);
// setTimeout(() => { console.log("log 3"); }, 0);
// const number = await new Promise((resolve, reject) => {
//     resolve(10);
// });
// console.log(number);
// number.then(n => { console.log(n); });
// console.log("log 4");



const PORT = process.env.PORT || 2222;

// console.log(process);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

// database + API
// middlewares
// token
// middlewares