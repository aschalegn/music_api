import { insertSong } from "../song.dal.js";
import { db } from "../../../database/index.js";
import { songEvents } from "../../../notifications/EventEmitters/songEvents.js";

const addNewSong = async (req, res) => {
    const { body } = req;
    // const result = await insertSong(db, body);

    // after added to db emit event
    songEvents.newSong(body);
    res.send("working on distribution of your song");
};


export const songControllers = { addNewSong };