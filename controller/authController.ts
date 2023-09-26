import {Request, Response} from "express";
import {
    createTokensSevices,generateTokenServices,logoutServices
} from "../services/authServices";
import baseResponse from '../dto/baseResponse'
import {userValidations} from "./validations/userValidations";
import { usernameControlServices} from "../services/userServices";
import bcrypt from "bcryptjs";

let loginController = async (req: Request, res: Response) => {
    try {
        const {username,password}=req.body
        userValidations({username})
        const data=await usernameControlServices(username)
        if (data?.dataValues===undefined){
            throw new Error('Bu kullanici sistemde kayitli degildir.')
        }else{
            const passwordHashControl:boolean=bcrypt.compareSync(password,data?.dataValues.password)
            if (passwordHashControl===true){
                const json = await createTokensSevices(req, res)
                res.json(baseResponse.baseResponseFunctionSuccess({data:json}))
            }else{
                throw new Error('Sifre yanlis girildi.')
            }
        }

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let tokenGenerateController = async (req: Request, res: Response) => {
    try {
        const {refreshtoken} = req.body
        if (refreshtoken === undefined){
            throw new Error('refreshToken bos olamaz.')
        }
        else{
            const json = await generateTokenServices(req,res)
            res.json(baseResponse.baseResponseFunctionSuccess({data:json}))
        }
    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let logoutController = async (req: Request, res: Response) => {
    try {
        const {username}=req.body
        const data=await usernameControlServices(username)
        if (data?.dataValues===undefined){
            throw new Error('Bu kullanici sistemde kayitli degildir.')
        }else{
            const json = await logoutServices(req,res)
            res.json(baseResponse.baseResponseFunctionSuccess({data:json}))
        }


    }catch(e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}

export {
    loginController, tokenGenerateController, logoutController
}

