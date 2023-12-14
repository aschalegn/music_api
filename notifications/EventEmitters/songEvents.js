import EventEmitter from "events";

class SongEvents extends EventEmitter {
    constructor() {
        super();
    }
    newSong(songData) {
        this.emit("songAdded", songData);
    }
};

export const songEvents = new SongEvents();