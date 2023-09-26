import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from "../db/connectDb";
import User  from './User'

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    userid: {
        type: DataTypes.UUID,
    },
    postname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    postdescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{paranoid:true});

Post.belongsTo(User,{foreignKey:'userid',as:'user',onDelete:'CASCADE'})
export default Post
