import {Request,Response} from "express";
import bcrypt from 'bcryptjs'
import User from '../models/User'

let userGetNameServices=async (req:Request,res:Response)=>{
    try {
        const {username}=req.body
        const json=await User.findOne({where:{username},paranoid:false})
        return json

    }catch (e) {
        console.log('e',e)
    }
}
let createUserServices=async (req:Request,res:Response)=>{
    try {
        const {username,password,role}=req.body
        let salt:string =bcrypt.genSaltSync(10)
        let hashPassword:string=bcrypt.hashSync(password, salt)
        const json=await User.create({
            username,
            password:hashPassword,
            role
        })
        return json

    }catch (e) {
        console.log('e',e)
    }
}
let editRoleServices=async (req:Request,res:Response)=>{
    try {
        const {username,role}=req.body
        const json=await User.update({
            role
        },{where:{username}})
        return json

    }catch (e) {
        console.log('e',e)
    }
}
let editPasswordServices=async (req:Request,res:Response)=>{
    try {
        const {oldpassword,newpassword,username}=req.body
        const json=await User.update({
        },{where:{username}})
        return json

    }catch (e) {
        console.log('e',e)
    }
}
let deleteUserServices=async (req:Request,res:Response)=>{
    try {
        const {username}=req.body
        const json=await User.destroy({where: {username}})
        return json

    }catch (e) {
        console.log('e',e)
    }
}


export {
    userGetNameServices,createUserServices,editRoleServices,deleteUserServices,editPasswordServices
}

