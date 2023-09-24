import {Request,Response} from "express";

let userGet=async (req:Request,res:Response)=>{
    try {

        let a:string='asdasdsa'
        return a

    }catch (e) {
        console.log('e',e)
    }
}
module.exports = {
    userGet
}

