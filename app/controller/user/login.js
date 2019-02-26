import validateParams from '../../utils/validator'
import bcrypt from "bcrypt";
import { validateError } from '../../utils/helper'
import {sendRes} from '../../utils/requestSend'
import User from '../../models/user'

async function login(req, res, next, instance) {
  const {username, password} = req.body
  const user = await User.findOne({username})
  console.log(user)
  if (!user) {
    sendRes(res, 400, {
      message: '用户不存在,请先注册！'
    })
    return
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password)
  if (isPasswordCorrect) {
    const token = instance.generateToken({
      username,
      password: user.password,
      host: req.hostname
    })
    sendRes(res, 200, {
      accessToken: token,
      uid: user._id,
      username,
      message: '登录成功！'
    })
    return
  }
  sendRes(res, 400, {
    message: '密码不正确！'
  })
}


export default function (req, res, next, instance) {
  const rules = {
    username: [
      {required: true, message: '缺少username参数！'},
      {type: String, message: 'username参数必须为字符串！'},
      {len: 15, message: 'username参数 不能超过15个字符！'}
    ],
    password: [
      {required: true, message: '缺少password参数！'},
      {type: String, message: 'password参数必须为字符串！'},
      {len: 15, message: 'password参数 不能超过15个字符！'}
    ]
  }

  validateParams(req.body, rules, function() {
    login(req, res, next, instance).catch(err => {
      next(err)
    })
  }, validateError.bind(null, res))
}
