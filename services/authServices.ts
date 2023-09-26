import {Request, Response} from "express";
import User from '../models/User'
import jwt from 'jsonwebtoken'


let refreshTokens: string[] = [];
let createTokensSevices = async (req: Request, res: Response) => {
    try {
        const {username} = req.body

        const user = await User.findOne({where: {username}, paranoid: false})
        const roleResult = await user?.dataValues?.role
        const tokenData = {role: roleResult, username: username}
        const accessToken = generateAccessToken(tokenData)
        const refreshToken = generateRefreshToken(tokenData)
        if (refreshTokens.length!==0){
            refreshTokens.map(async (data) => await jwt.verify(data, process.env.REFRESH_TOKEN_KEY || '', (err:any, data2:any) => {
                if (data2?.compareResult?.username === username) {
                    refreshTokens = refreshTokens.filter(tokens => tokens !== data)
                }
            }))
        }
        refreshTokens.push(refreshToken)
        return ({accessToken: accessToken, refreshToken: refreshToken})

    } catch (e: any) {
        console.log('e', e)
        throw e

    }
}
let generateTokenServices = async (req: Request, res: Response) => {
    try {
        const {refreshtoken} = req.body
        if (!refreshTokens.includes(refreshtoken)) {
            throw new Error('UNAUTHORIZE - refreshtoken gecersiz yada suresi bitmis.')
        } else {
            return jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY || '', (err: any, data: any) => {
                if (err) {
                    throw new Error('UNAUTHORIZE - cozumleme problemi.')
                }
                const accessToken = generateAccessToken(data.compareResult)
                return ({accessToken: accessToken})

            })


        }
    } catch (e: any) {
        console.log('e', e)
        throw e

    }
}
let logoutServices = async (req: Request, res: Response) => {
    try {
        const {username} = req.body
        let count:number=0
        refreshTokens.map(async (data) => await jwt.verify(data, process.env.REFRESH_TOKEN_KEY || '', (err:any, data2:any) => {
            if (data2?.compareResult?.username === username) {
                refreshTokens = refreshTokens.filter(tokens => tokens !== data)
                count++
            }
        }))
        if (count===0){
            throw new Error('Zaten cikmis gibi gozukuyorsunuz.')
        }
        return true
    } catch
        (e) {
        console.log('token Error')
        throw e
    }
}

interface User {
    role: string,
    username: string
}

const generateAccessToken = (user: User) => {
    const payload = {compareResult: user}
    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_KEY || '',
        {expiresIn: process.env.ACCESS_TOKEN_TIME}
    );
    return accessToken
}

const generateRefreshToken = (user: User) => {
    const payload = {compareResult: user}
    const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_KEY || '',
        {expiresIn: process.env.REFRESH_TOKEN_TIME}
    );
    return refreshToken
}


export {
    createTokensSevices, generateTokenServices, logoutServices
}

