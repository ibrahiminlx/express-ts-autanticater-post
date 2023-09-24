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
const sequelize_1 = require("sequelize");
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const password = process.env.DB_PASSWORD || '';
const username = process.env.DB_USER || '';
const db = {};
const sequelize = new sequelize_1.Sequelize('testDb', username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    dialectModule: pg_1.default,
    retry: {
        max: 3,
    },
});
const sequelizetest = new sequelize_1.Sequelize('postgres', username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    dialectModule: pg_1.default,
    retry: {
        max: 3
    }
});
db.sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.connect = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db.sequelize.authenticate();
            console.log(`${process.env.PORT} in Port db Online`);
            resolve(db);
        }
        catch (e) {
            console.error('Err Db Connection', e);
            reject(e);
        }
    }));
});
db.createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    // const vpnName = require('../models/vpnName');
    // const vpnIp = require('../models/vpnIp');
    // const user = require('../models/user');
    //
    // await vpnName.sync({ force: true });
    // await vpnIp.sync({ force: true });
    // await user.sync({ force: true });
});
db.dbQueryAndCreate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Veritabanını kontrol et
        const databaseExists = yield sequelizetest.query(`SELECT 1 FROM pg_database WHERE datname = 'testDb'`, {
            type: sequelize_1.QueryTypes.SELECT, // QueryTypes'ı kullan
        });
        if (!databaseExists.length) {
            yield sequelizetest.query('CREATE DATABASE "testDb";');
            yield db.createTable();
            console.log('Veritabanı ve tablolar başarıyla oluşturuldu veya mevcuttu.');
        }
        else {
            console.log('Veritabanı zaten mevcut.');
        }
    }
    catch (error) {
        console.error('Veritabanı oluşturma hatası:', error);
    }
});
module.exports = db;
