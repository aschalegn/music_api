import mysql from "mysql2/promise";
import { config } from "../config/index.js";

export const pool = mysql.createPool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.dbName,
    connectionLimit: 10
});



// class Database
// javascript => es6  =. es7/8/9= esNext

class SQLDataBase {
    #db;
    /**
     * 
     * @param {import("mysql2/promise").Pool} db 
     */
    constructor(db) {
        this.#db = db;
    }
    async insert(table, obj) {
        const keys = Object.keys(obj);
        const placeHolders = keys.map(() => '?');
        const values = Object.values(obj);
        const result = await this.#db.execute(`INSERT INTO ${table}(${keys}) VALUES(${placeHolders})`, values);
        return result;
    }
    /**
     * 
     * @param {string} table 
     * @param {Array<string>} columns 
     * @param {Object} query  @example {email: "ggg@deprecated.com", age: 45}
     */
    async find(table, columns, query) {
        let baseSql = `SELECT ${columns} FROM ${table} `;
        const builder = this.#buildQuery(query);
        if (builder.condition) baseSql += `WHERE  ${builder.condition}`;
        const [rows] = await this.#db.execute(baseSql, builder.values);
        return rows;
    };
    async findOne() { }
    async update(table, query, data) {
        let baseSql = `UPDATE ${table} SET `;
        const columnToSet = Object.keys(data).map((key) => `${key}=?`);
        baseSql += `SET ${columnToSet}`;
        const values = Object.values(data);

        const builder = this.#buildQuery(query);
        if (builder.condition) baseSql += `WHERE ${builder.condition}`;

        const result = await this.#db.execute(baseSql, values);
        return result;
    };
    async delete(table, query) {
        let baseSql = `DELETE FROM ${table} `;
        const builder = this.#buildQuery(query);
        if (builder.condition) baseSql += `WHERE  ${builder.condition}`;
        const result = await this.#db.execute(baseSql, builder.values);
        return result;
    };
    /**
     * 
     * @param {Object} obj @example {email: "ggg@deprecated.com", age: 45, isPremium: false}
     * @returns {Object {condition<string>, values:Array}}
     */
    #buildQuery(obj = {}) {
        const conditions = [];
        const values = [];

        for (const [key, value] of Object.entries(obj)) {
            if (value ?? false) {
                conditions.push(`${key} = ?`);
                values.push(value);
            };
        }
        const conditionString = conditions.length ? `${conditions.join(' AND ')}` : '';
        return {
            condition: conditionString,
            values: values
        };
    };
};

class APIDataBase {
    constructor() { }
    async insert(url, obj) {

    }

    async find(url, columns, query) {

    };
    
    async findOne() { }

    async update(url, query, data) {

    };

    async delete(url, query) {

    };
};


const db = new SQLDataBase(pool);
const apiDb = new APIDataBase();

export { db, apiDb };