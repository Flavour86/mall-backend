import express from 'express';
import UserModule from '../../controller/user'
import Auth from '../../middlewares/auth'
const userRouter = express.Router()

userRouter.post('/login', UserModule.Login)
userRouter.post('/logout', Auth, UserModule.Logout)
userRouter.post('/register', UserModule.register)

export default userRouter
