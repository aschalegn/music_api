import dotenv from "dotenv";
dotenv.config();

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_NAME,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    jWT_ACCESS_LIFESPAN,
    jWT_REFRESH_LIFESPAN,
    USERS_BASE_URL,
    REDIS_URL
} = process.env;

export const config = {
    database: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        dbName: DB_NAME,
    },
    jwt: {
        accesSecret: JWT_ACCESS_SECRET,
        refreshSecret: JWT_REFRESH_SECRET,
        accessLifeSpan: jWT_ACCESS_LIFESPAN,
        refreshLifeSpan: jWT_REFRESH_LIFESPAN
    },
    thirdParty: {
        users: USERS_BASE_URL
    },
    redisUrl: REDIS_URL
};

// console.log(config.jwt);