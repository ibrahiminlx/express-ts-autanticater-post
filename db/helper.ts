import {QueryTypes, Sequelize} from 'sequelize';

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const password:string = process.env.DB_PASSWORD || '';
const username:string = process.env.DB_USER || '';

const db: any = {};
const sequelize = new Sequelize('testDb', username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    dialectModule: pg,
    retry: {
        max: 3,
    },
});
const sequelizetest = new Sequelize('postgres', username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    dialectModule: pg,
    retry: {
        max:3
    }
});

db.sequelize = Sequelize;
db.sequelize = sequelize;

db.connect = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.sequelize.authenticate();
            console.log(`${process.env.PORT} in Port db Online`);
            resolve(db);
        } catch (e) {
            console.error('Err Db Connection', e);
            reject(e);
        }
    });
};

db.createTable = async () => {
    // const vpnName = require('../models/vpnName');
    // const vpnIp = require('../models/vpnIp');
    // const user = require('../models/user');
    //
    // await vpnName.sync({ force: true });
    // await vpnIp.sync({ force: true });
    // await user.sync({ force: true });



};

db.dbQueryAndCreate = async () => {
    try {
        // Veritabanını kontrol et
        const databaseExists: any[] = await sequelizetest.query(`SELECT 1 FROM pg_database WHERE datname = 'testDb'`, {
            type: QueryTypes.SELECT, // QueryTypes'ı kullan
        });
        if (!databaseExists.length) {
            await sequelizetest.query('CREATE DATABASE "testDb";');
            await db.createTable();
            console.log('Veritabanı ve tablolar başarıyla oluşturuldu veya mevcuttu.');
        } else {
            console.log('Veritabanı zaten mevcut.');
        }
    } catch (error: any) {
        console.error('Veritabanı oluşturma hatası:', error);
    }
};

export = db;
