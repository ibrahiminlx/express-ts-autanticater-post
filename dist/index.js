"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv');
const router = require('./router/userRouter');
const helper_1 = __importDefault(require("./db/helper"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
//
// app.get('/', (req:Request, res:Response) => {
//     res.send('Express + TypeScript Server');
// });
app.use('/', router);
app.listen(port, () => {
    helper_1.default.dbQueryAndCreate();
    helper_1.default.connect();
});
