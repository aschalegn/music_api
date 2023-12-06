import { db } from "../../../database/index.js";
import { findUsers, insertUser } from "../user.dal.js";
import { encrypt, isEqual } from "../../../utils/bcrypt.js";
import { AppError } from "../../../utils/Error.js";
import { jwtFuncs } from "../../../utils/jwt.js";
import { config } from "../../../config/index.js";

const register = async (req, res) => {
    const { body } = req;
    // check if exists by usign email
    const users = await findUsers(db, { email: body.email });

    // console.log(req.url, req.originalUrl);
    if (users.length) throw new AppError({
        message: "Email is in the system",
        timeStemp: Date.now(),
        url: req.url,
        method: req.method,
        httpStaus: 401,
        domain: "user registtration"
    });

    // encrypt password => bcrptjs
    // console.log({ beforeHash: body.password });
    body.password = await encrypt(body.password);
    // console.log({ afterHash: body.password });

    //Todo: handle token

    // insert to database
    const result = await insertUser(db, body);
    console.log(result);
    res.status(201).send({ id: result[0].insertId });
}

const loginUser = async (req, res) => {
    const { body } = req;
    const users = await findUsers(db, { email: body.email });
    if (!users.length) throw Error("password or email are not valid");
    // check if password is valid
    const isValid = await isEqual(body.password, users[0].password);
    if (!isValid) throw Error("password or email are not valid");

    //Todo: handle token
    const accessToken = await jwtFuncs.signToken(
        { id: users[0].user_id, email: users[0].email, roles: users[0].role },
        { secret: config.jwt.accesSecret, options: { expiresIn: config.jwt.accessLifeSpan } }
    );

    const refreshToken = await jwtFuncs.signToken(
        { id: users[0].user_id, email: users[0].email, roles: users[0].role },
        { secret: config.jwt.refreshSecret, options: { expiresIn: config.jwt.refreshLifeSpan } }
    );

    //TODO: set headers
    res.cookie("accessKey", accessToken, {
        httpOnly: true,
        maxAge: 10000
    });

    res.cookie("refreshKey", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    // return to client
    res.send({ user: users[0], accessToken, refreshToken });
};

const getUsersList = async (req, res) => {
    const rows = await findUsers(db, {});
    res.send(rows);
};


export const userController = { register, loginUser, getUsersList }