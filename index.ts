import express, { Request, Response } from 'express';
const dotenv = require('dotenv');
const router=require('./router/userRouter')
import db from './db/helper'
dotenv.config();

const app = express();

const port = process.env.PORT;

//
// app.get('/', (req:Request, res:Response) => {
//     res.send('Express + TypeScript Server');
// });
app.use('/',router)
app.listen(port, () => {
    db.dbQueryAndCreate()
    db.connect()
});
