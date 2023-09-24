import { Sequelize } from 'sequelize';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const password: string = process.env.DB_PASSWORD || '';
const username: string = process.env.DB_USER || '';

const sequelize = new Sequelize('testDb', username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    dialectModule: pg,
    retry: {
        max: 3,
    },
});
export default sequelize
