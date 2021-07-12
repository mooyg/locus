"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();
exports.redis = new Redis({
    port: 15222,
    host: process.env.REDIS_HOST,
    family: 4,
    password: process.env.REDIS_PASSWORD,
    db: 0,
});
//# sourceMappingURL=redis.js.map