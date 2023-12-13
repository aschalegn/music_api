import { parentPort, workerData } from "worker_threads";

const count = (num) => {
    let total = 0;
    for (let index = 0; index < num; index++) {
        total += 1
    }
    return total;
};


parentPort.postMessage(count(workerData.number));