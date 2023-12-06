import bcrypt from "bcryptjs";

/**
 * 
 * @param {string} password 
 * @returns {string}
 */
export const encrypt = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

/**
 * 
 * @param {string} password 
 * @param {string} hash 
 * @returns {boolean}
 */

export const isEqual = async (password, hash) => {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
}