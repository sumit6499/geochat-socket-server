"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = new ioredis_1.default(process.env.REDIS_URL);
redisClient.on('error', (error) => {
    console.error("redis error");
});
exports.default = redisClient;
//# sourceMappingURL=redis.js.map