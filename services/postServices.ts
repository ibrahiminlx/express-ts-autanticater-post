import {Request, Response} from "express";
import Post from '../models/Post'

let postGetIdServices = async (req: Request, res: Response) => {
    try {
        const {postid} = req.body
        const json = await Post.findOne({where: {id: postid}, paranoid: false})
        return json

    } catch (e) {
        console.log('e', e)
        throw e

    }
}
let postGetDeletedServices = async (req: Request, res: Response) => {
    try {
        const {postid} = req.body
        const json = await Post.findOne({where: {id: postid}, paranoid: false})
        return json

    } catch (e) {
        console.log('e', e)
        throw e

    }
}
let createPostServices = async (req: Request, res: Response, userid: string) => {
    try {
        const {postname, postdescription} = req.body
        const json = await Post.create({
            userid: userid,
            postname,
            postdescription
        })
        return json

    } catch (e) {
        console.log('e', e)
        throw e

    }
}
let editPostSevices = async (req: Request, res: Response) => {
    try {
        const {postid, postname, postdescription} = req.body
        const json = await Post.update({
            postname,
            postdescription
        }, {where: {id: postid}})
        return json

    } catch (e) {
        console.log('e', e)
        throw e

    }
}
let deletePostServices = async (req: Request, res: Response) => {
    try {
        const {postid} = req.body
        const json = await Post.destroy({where: {id: postid}})
        return json

    } catch (e) {
        console.log('e', e)
        throw e

    }
}
let postIdControlServices = async (postId: string) => {
    try {
        const post = await Post.findOne({where: {id: postId}})
        return post
    } catch (e) {
        throw e
    }
}
let postIdDeletedControlServices = async (postId: string) => {
    try {
        const post = await Post.findOne({where: {id: postId}, paranoid: false})
        return post
    } catch (e) {
        throw e
    }
}
let postnameControlServices = async (postname: string) => {
    try {
        const user = await Post.findOne({where: {postname}})
        return user
    } catch (e) {
        throw e
    }
}
let postUserControlServices = async (userid: string) => {
    try {
        const user = await Post.findOne({where: {userid}})
        if (user?.dataValues){
            return true
        }
        return false
    } catch (e) {
        throw e
    }
}
let postUserGetAllPostsServices = async (userid: string) => {
    try {
        const user = await Post.findAll({where: {userid}})
        return user
    } catch (e) {
        throw e
    }
}


export {
    postGetIdServices,
    createPostServices,
    editPostSevices,
    deletePostServices,
    postIdControlServices,
    postGetDeletedServices,
    postIdDeletedControlServices,
    postnameControlServices,
    postUserControlServices,
    postUserGetAllPostsServices
}

