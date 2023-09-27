import {Request,Response} from "express";
import bcrypt from 'bcryptjs'
import User from '../models/User'
import {db} from "../db/helper";

let userGetNameServices=async (req:Request,res:Response)=>{
    try {
        const {username}=req.body
        const json=await User.findOne({where:{username},paranoid:false})
        return json

    }catch (e) {
        console.log('e',e)
        throw e

    }
}
let createUserServices=async (req:Request,res:Response)=>{
    let transaction=null
    try {
        transaction = await db.sequelize.transaction()
        const {username,password,role}=req.body
        let salt:string =bcrypt.genSaltSync(10)
        let hashPassword:string=bcrypt.hashSync(password, salt)
        const json=await User.create({
            username,
            password:hashPassword,
            role
        })
        await transaction.commit();
        return json

    }catch (e) {
        await transaction.rollback();
        console.log('e',e)
        throw e

    }
}
let editRoleServices=async (req:Request,res:Response)=>{
    let transaction=null
    try {
        transaction = await db.sequelize.transaction()
        const {username,role}=req.body
        const json=await User.update({
            role
        },{where:{username}})
        await transaction.commit();
        return json

    }catch (e) {
        await transaction.rollback();
        console.log('e',e)
        throw e

    }
}
let editPasswordServices=async (req:Request,res:Response)=>{
    let transaction=null
    try {
        transaction = await db.sequelize.transaction()
        const {newpassword,username}=req.body
        let salt:string =bcrypt.genSaltSync(10)
        let hashPassword:string=bcrypt.hashSync(newpassword, salt)
        const json=await User.update({
            password:hashPassword
        },{where:{username}})
        await transaction.commit();
        return json

    }catch (e) {
        await transaction.rollback();
        console.log('e',e)
        throw e

    }
}
let deleteUserServices=async (req:Request,res:Response)=>{
    let transaction=null
    try {
        transaction = await db.sequelize.transaction()
        const {username}=req.body
        const json=await User.destroy({where: {username}})
        await transaction.commit();
        return json

    }catch (e) {
        await transaction.rollback();
        console.log('e',e)
        throw e

    }
}
let usernameControlServices=async (username:string)=>{
    try {
        const user= await User.findOne({where:{username}})
        return user
    }catch (e) {
        throw e
    }
}


export {
    userGetNameServices,createUserServices,editRoleServices,deleteUserServices,editPasswordServices,usernameControlServices
}

