import express from 'express';
import UserModule from '../../controller/user'
const userRouter = express.Router()

userRouter.get('/login', UserModule.Login)

export default userRouter
