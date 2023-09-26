import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import userRouter from "./router/userRouter";
import {db} from './db/helper'
import helmet from 'helmet'
import cors from 'cors'
import postRouter from "./router/postRouter";
import authRouter from "./router/authRouter";
dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use('/',userRouter)
app.use('/post',postRouter)
app.use('/auth',authRouter)

app.listen(port, async () => {
    await db.dbQueryAndCreate()
    await db.connect()
});
