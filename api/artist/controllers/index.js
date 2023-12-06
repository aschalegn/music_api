import { findArtits, insertArtist } from "../artist.dal.js";
import {  pool } from "../../../database/index.js";

const addNewArtist = async (req, res, next) => {
    try {
        const { body } = req;
        await insertArtist(pool, body);
        res.status(201).send("added")
    } catch (error) {
        next(error);
    }
};

const getArtists = async (req, res, next) => {
    try {
        // throw new Error("sdkncdjkfnkjdfnkdfljkhb");
        const { query } = req;
        const dbQuery = buildQuery(query);
        const artists = await findArtits(pool, dbQuery);
        return res.send(artists);
    } catch (error) {
        next(error);
    }
};

const artistController = {
    addNewArtist,
    getArtists
};
export { artistController };