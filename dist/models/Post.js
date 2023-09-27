"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDb_1 = __importDefault(require("../db/connectDb"));
const User_1 = __importDefault(require("./User"));
const Post = connectDb_1.default.define('Post', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    userid: {
        type: sequelize_1.DataTypes.UUID,
    },
    postname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    postdescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { paranoid: true });
Post.belongsTo(User_1.default, { foreignKey: 'userid', as: 'user', onDelete: 'CASCADE' });
exports.default = Post;
