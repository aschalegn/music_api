import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { promisify } from "util";

// header => 
// payload =>
// signature =>

const signToken = async (payload, config = {}) => {
    const token = await promisify(jwt.sign)({ ...payload }, config.secret, { ...config.options });
    return token;
}

/**
 * 
 * @param {string} token 
 * @returns {OBject} 
 */

const verifyToken = async (token, secret) => {
    try {
        const payload = await promisify(jwt.verify)(token, secret);
        return { payload, expired: false };
    } catch (error) {
        console.log(error);
        if (error.message === 'jwt expired') {
            return { payload: null, expired: true };
        }
        return { payload: null };
    }
};


export const jwtFuncs = { verifyToken, signToken }

// event queue 

// single threaded
 
// tread pool

// [a, b, c, d];
// [a, b, c, d];

