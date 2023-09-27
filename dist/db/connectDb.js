"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const password = process.env.DB_PASSWORD || '';
const username = process.env.DB_USER || '';
const sequelize = new sequelize_1.Sequelize('testDb', username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    dialectModule: pg_1.default,
    retry: {
        max: 3,
    },
});
exports.default = sequelize;
