import {Request, Response} from "express";
import {
    postIdControlServices,
    postGetIdServices,
    editPostSevices,
    deletePostServices,
    postGetDeletedServices,
    postIdDeletedControlServices,
    createPostServices,
    postnameControlServices,
    postUserControlServices, postUserGetAllPostsServices
} from "../services/postServices";
import baseResponse from '../dto/baseResponse'
import {postValidations} from "./validations/postValidations";
import jwt from "jsonwebtoken";
import {usernameControlServices} from "../services/userServices";

let postGetIdController = async (req: Request, res: Response) => {
    try {
        const {postid}=req.body
        postValidations({postid:postid})
        const data=await postIdControlServices(postid)
        if (data?.dataValues===undefined){
            throw new Error('Bu post sistemde bulunamadi.')
        }
        const json = await postGetIdServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let userGetPostController = async (req: Request, res: Response) => {
    try {
        const token:string = req.headers['x-access-token'] as string;
        let username:string=''
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY || '', (err: any, data: any) => {
            username = data?.compareResult?.username
        })
        const data=await usernameControlServices(username)
        if (data?.dataValues===undefined){
            throw new Error('Bu user sistemde bulunamadi.')
        }else{
            let userid=data?.dataValues?.id
            const userInPostData=postUserControlServices(userid)
            userInPostData.then(async data => {
                if (data === true) {
                    const json = await postUserGetAllPostsServices(userid)
                    res.json(baseResponse.baseResponseFunctionSuccess({data:json}))
                } else {
                    throw new Error('Bu userin postu bulunamadi.')
                }
            })

        }

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let postGetDeletedController = async (req: Request, res: Response) => {
    try {
        const {postid}=req.body
        postValidations({postid:postid})
        const data=await postIdDeletedControlServices(postid)
        if (data?.dataValues===undefined){
            throw new Error('Bu post sistemde bulunamadi.')
        }
        const json = await postGetDeletedServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let createPostController = async (req: Request, res: Response) => {
    try {
        const {postname,postdescription}=req.body
        const token:string = req.headers['x-access-token'] as string;
        postValidations({postname,postdescription})
        let username:string=''
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY || '', (err: any, data: any) => {
            username = data.compareResult.username
        })
        const data=await usernameControlServices(username)
        let userid=data?.dataValues?.id
        const postNameControl=await postnameControlServices(postname)
        if (postNameControl?.dataValues===undefined){
            const json = await createPostServices(req, res,userid)
            res.json(baseResponse.baseResponseFunctionSuccess({data:json}))
        }else{
            throw new Error('Bu post sistemde bulunuyor.')
        }


    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}
let editPostController = async (req: Request, res: Response) => {
    try {
        const {postid,postname,postdescription}=req.body
        if (postname!==undefined) postValidations({postname})
        if (postdescription!==undefined) postValidations({postdescription})
        if (postid!==undefined) postValidations({postid})
        const data=await postIdControlServices(postid)
        let postUserId=data?.dataValues?.userid
        if (data?.dataValues===undefined){
            throw new Error('Bu post sistemde bulunamadi.')
        }
        if (postname.length!==0){
            const postNameControl=await postnameControlServices(postname)
            if (postNameControl?.dataValues===undefined){
                const token:string = req.headers['x-access-token'] as string;
                let username:string=''
                jwt.verify(token, process.env.ACCESS_TOKEN_KEY || '', (err: any, data: any) => {
                    username = data.compareResult.username
                })
                const data=await usernameControlServices(username)
                let tokenUserid=data?.dataValues?.id
                if (tokenUserid===postUserId){
                    const json = await editPostSevices(req, res)
                    res.json(baseResponse.baseResponseFunctionSuccess({data:json}))
                }else{
                    throw new Error('Kendinizin olmayan bir postu degistiremezsiniz.')
                }

            }else{
                throw new Error('Bu postname sistemde bulunuyor.')
            }
        }



    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}

let deletePostController = async (req: Request, res: Response) => {
    try {
        const {postid}=req.body
        postValidations({postid})
        const data=await postIdControlServices(postid)
        if (data?.dataValues===undefined){
            throw new Error('Bu post sistemde bulunamadi.')
        }
        const json = await deletePostServices(req, res)
        res.json(baseResponse.baseResponseFunctionSuccess({data:json}))

    } catch (e:any) {
        console.log('e', e)
        res.status(500).json(baseResponse.baseResponseFunctionError({message:e.message}))
    }
}


export {
    postGetIdController, createPostController, editPostController, deletePostController,postGetDeletedController,userGetPostController
}

