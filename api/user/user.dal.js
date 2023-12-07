/**
 * 
 * @param {import("mysql2/promise").Pool} pool 
 * @param {Object} obj 
 */

export const insertUser = async (db, obj) => {
    return await db.insert('users', obj);
};

/**
 * 
 * @param {import("mysql2/promise").Pool} pool 
 * @param {string} query 
 */

// export const findUsers = async (db, query) => {
//     return await db.find('users', ['*'], query);
// };

export const findUsers = async (db, resource, query) => {
    return await db.find(resource, ['*'], query);
};

// export const apiUsers = async (db, url, query) => {
//     return await db.find(url, [], query);
// };