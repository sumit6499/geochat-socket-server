"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
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
            socket.on('event:message', (message, callback) => {
                console.log(message);
                callback(message);
                socket.broadcast.emit(message);
            });
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
//# sourceMappingURL=socket.service.js.map