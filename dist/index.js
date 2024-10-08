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
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_service_1 = __importDefault(require("./services/socket.service"));
const process_1 = require("process");
const app = (0, express_1.default)();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = process.env.PORT || 8000;
    try {
        const socketService = new socket_service_1.default();
        const server = (0, http_1.createServer)(app);
        socketService.io.attach(server);
        server.listen(PORT, () => {
            console.log("server running");
        });
    }
    catch (error) {
        console.log(error);
        (0, process_1.exit)(1);
    }
});
//# sourceMappingURL=index.js.map