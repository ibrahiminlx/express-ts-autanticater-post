import {Request,Response} from "express";
const userServices=require('../services/userServices')
let userGet=async (req:Request,res:Response)=>{
    try {
        const json = await userServices.userGet(req,res)
        res.status(200).json(json)

    }catch (e) {
        console.log('e',e)
        res.status(500).json({Error: 'Bir hata olustu'})
    }
}
module.exports = {
    userGet
}

