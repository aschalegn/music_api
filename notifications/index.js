/**
 * 
 * 
 */

import { songEvents } from "./EventEmitters/songEvents.js";

export default (io) => {
    io.on('connection', (socket) => {
        console.log(`connected to client ${socket.id}`);
        socket.emit("connected_sucess", "wellcome to our real time server");

        socket.on("ping", (data) => {
            console.log(data);
            socket.emit("pong", { yourEvent: 'ping', myResponseEvent: 'pong' });
        });

        songEvents.on("songAdded", (data) => {
            socket.emit("newSong", data);
        });
    });
};