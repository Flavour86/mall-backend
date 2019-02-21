import express from 'express';
import UserModule from '../../controller/user'
const userRouter = express.Router()

userRouter.get('/login', UserModule.Login)
userRouter.post('/register', UserModule.register)

export default userRouter
