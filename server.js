import http from "http";
import os from "os";
import cluster from "cluster";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { app } from "./app.js";

import notification from "./notifications/index.js"


dotenv.config();

const cpus = os.cpus();

const server = http.createServer(app);

// console.log(server);

const io = new Server(server, { cors: { origin: "*" } });


notification(io);

const PORT = process.env.PORT || 2222;
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});



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



// console.log(process);

// console.log(cluster.isPrimary);
// if (cluster.isPrimary) {
//     console.log(`Primary cluster is ready pid: ${process.pid}`);
//     // initaiate the worker proceses
//     console.log(cpus.length);
//     for (let i = 0; i < cpus.length / 2; i++) cluster.fork(cpus[i]);
// }
// else {
// };


// load balacer

// database + API
// middlewares
// token
// middlewares