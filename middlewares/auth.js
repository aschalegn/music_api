import { config } from "../config/index.js";
import { jwtFuncs } from "../utils/jwt.js";

const auth = (roles = []) => {
    return async function (req, res, next) {
        next();
    }
};

export const authenticate = async (req, res, next) => {
    try {
        // console.log("this is middleware");
        //? cookies
        //headers => authorisation, custom key value
        const accessToken = req.headers["accesskey"];
        const accessTokenCoo = req.cookies;
        const refreshToken = req.headers["refreshkey"];

        // check if accesskey
        if (!accessToken || !refreshToken) return res.sendStatus(401);
        const decoded = await jwtFuncs.verifyToken(accessToken, config.jwt.accesSecret);

        if (decoded.payload && !decoded.expired) {
            res.locals.user = { ...decoded.payload };
            return next();
        }

        if (!decoded.payload && !decoded.expired) return res.sendStatus(401);
        //TODO:  check if refresh token is valid => done;
        
        // redis
        const refreshDecoded = await jwtFuncs.verifyToken(refreshToken, config.jwt.refreshSecret);
        if (!refreshDecoded.payload) return res.sendStatus(403);

        //todo generate new access token => done
        // console.log(refreshDecoded.payload);
        delete refreshDecoded.payload.exp;
        delete refreshDecoded.payload.iat;

        const newAccessToken = await jwtFuncs.signToken(
            refreshDecoded.payload,
            { secret: config.jwt.accesSecret, options: { expiresIn: config.jwt.accessLifeSpan } }
        );
        return res.status(200).send({ accessToken: newAccessToken });

        //? set headers
        res.locals.accessToken = newAccessToken; //?
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
};

export const authorize = (roles = []) => {
    return async (req, res, next) => {
        console.log(roles);
        console.log("authorization middleware");

        // check if user role is in roles array
        const user = res.locals.user;
        if (!roles.includes(user?.roles)) return res.sendStatus(401);
        next();
    }
};
