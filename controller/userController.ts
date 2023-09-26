import {Request, Response} from "express";
import {
    createUserServices,
    deleteUserServices,
    editPasswordServices,
    editRoleServices,
    userGetNameServices,
    usernameControlServices
} from "../services/userServices";
import baseResponse from '../dto/baseResponse'
import {userValidations} from './validations/userValidations'

let userGetNameController = async (req: Request, res: Response) => {
    try {
        const {username}=req.body
        userValidations({username})
        const data=await usernameControlServices(username)
        if (data?.dataValues===undefined){
            throw new Error('Bu kullanici sistemde bulunamadi.')
        }
        const json = await userGetNameServices(req, res)

        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let createUserController = async (req: Request, res: Response) => {
    try {
        const {username,password,role}=req.body
        userValidations({username,password,role})
        const json = await createUserServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let editRoleController = async (req: Request, res: Response) => {
    try {
        const json = await editRoleServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let editPasswordController = async (req: Request, res: Response) => {
    try {
        const json = await editPasswordServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let deleteUserController = async (req: Request, res: Response) => {
    try {
        const json = await deleteUserServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}


export {
    userGetNameController, createUserController, editRoleController, deleteUserController,editPasswordController
}

