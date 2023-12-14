export const insertSong = async (db, body) => {
    return await db.insert("songs", body);
}

export const findSings = async (db, query) => {
    return await db.find("songs", query);
}


