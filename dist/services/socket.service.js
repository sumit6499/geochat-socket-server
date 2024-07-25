"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const redis_1 = __importDefault(require("../lib/redis"));
class SocketService {
    constructor() {
        console.log("socket server intialized");
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        });
    }
    socketListners() {
        const io = this._io;
        console.log("socket listeners intialized");
        io.on('connect', (socket) => {
            console.log("new socket connected" + socket.id);
            socket.on('send-message', (message, callback) => {
                console.log(message);
                io.emit('recieve-message', message);
            });
            socket.on('send-location', (location) => __awaiter(this, void 0, void 0, function* () {
                const { user, lat, long } = JSON.parse(location);
                console.log(user);
                if (user) {
                    //store location of user in redis geospatial DS
                    yield redis_1.default.geoadd("location:nearby", "NX", long, lat, user);
                    redis_1.default.expire("location:nearby", 7);
                    //find nearby user within 1KM
                    const userNearby = yield redis_1.default.georadius("location:nearby", long, lat, 1, "KM");
                    const friendsNearby = userNearby.filter((val) => {
                        if (val !== user) {
                            return user;
                        }
                    });
                    socket.emit("nearby-friend", friendsNearby);
                }
            }));
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
//# sourceMappingURL=socket.service.js.map