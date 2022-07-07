"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
var PORT = 3001;
app.get("/api/ping", function (_req, res) { return res.send("Hello Full Stack!"); });
app.listen(PORT, function () { return console.log("Server running on port: ".concat(PORT)); });
