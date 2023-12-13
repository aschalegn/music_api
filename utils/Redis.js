import { createClient, createCluster } from 'redis';
import { config } from '../config/index.js';

class RedisCache {
    #redisClient;
    /**
     * 
     * @param {RedisClient} client 
     */
    constructor(client) {
        this.#redisClient = client;
        this.connect();
    };
    async connect() {
        await this.#redisClient.connect();
    };
    async SET(key, value, time) {
        return this.#redisClient.set(key, value, { EX: time }) //in seconds);
    };
    async GET(key) {
        return await this.#redisClient.get(key);
    };
    async DEL(key) {
        return await this.#redisClient.del(key);
    };
};

const client = createClient({ url: config.redisUrl });
const cl = createCluster({ rootNodes: [{ url: config.redisUrl }, {}] });

export const redisCatch = new RedisCache(client);

// redisCatch