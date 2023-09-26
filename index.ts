import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import router from "./router/userRouter";
import {db} from './db/helper'
import helmet from 'helmet'
import cors from 'cors'
dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use('/',router)

app.listen(port, async () => {
    await db.dbQueryAndCreate()
    await db.connect()
});
