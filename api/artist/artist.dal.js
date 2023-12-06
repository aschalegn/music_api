// client => routes => <= controllers => dal(data access layer);
/**
 * 
 * @param {Object} artist
 * 
 */

// insert new row
const insertArtist = async (pool, artist) => {
    // const res = await pool.execute(`INSERT INTO artists (username, email, password) VALUES(?,?,?)`, artist);
    const keys = Object.keys(artist); //username, email, password
    const placrHolder = keys.map(() => '?');
    const values = Object.values(artist);
    console.log({ keys, placrHolder, values });
    const res = await pool.execute(`INSERT INTO artists (${keys}) VALUES(${placrHolder})`, values);
    return res;
};

const findArtits = async (pool, query) => {
    try {
        let baseSql = `SELECT * FROM artists `;
        baseSql += query.condition;
        // console.log({ query, baseSql });
        const [rows] = await pool.query(baseSql, query.values);
        return rows;
    } catch (error) {
        throw Error(error.message);
    }
};

export { insertArtist, findArtits };