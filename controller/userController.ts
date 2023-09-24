import {Request, Response} from "express";
import {
    createUserServices,
    deleteUserServices, editPasswordServices,
    editRoleServices,
    userGetNameServices
} from "../services/userServices";
import baseResponse from '../dto/baseResponse'

let userGetNameController = async (req: Request, res: Response) => {
    try {
        const json = await userGetNameServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e) {
        console.log('e', e)
        res.status(500).json({Error: 'Bir hata olustu'})
    }
}
let createUserController = async (req: Request, res: Response) => {
    try {
        const json = await createUserServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e) {
        console.log('e', e)
        res.status(500).json({Error: 'Bir hata olustu'})
    }
}
let editRoleController = async (req: Request, res: Response) => {
    try {
        const json = await editRoleServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e) {
        console.log('e', e)
        res.status(500).json({Error: 'Bir hata olustu'})
    }
}
let editPasswordController = async (req: Request, res: Response) => {
    try {
        const json = await editPasswordServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e) {
        console.log('e', e)
        res.status(500).json({Error: 'Bir hata olustu'})
    }
}
let deleteUserController = async (req: Request, res: Response) => {
    try {
        const json = await deleteUserServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e) {
        console.log('e', e)
        res.status(500).json({Error: 'Bir hata olustu'})
    }
}


export {
    userGetNameController, createUserController, editRoleController, deleteUserController,editPasswordController
}

