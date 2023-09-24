import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from "../db/connectDb";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('read', 'write', 'readandwrite', 'admin'),
        defaultValue: 'read',
    },
},{paranoid:true});
export default User
