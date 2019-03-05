import validateParams from '../../utils/validator'
import { email } from '../../utils/pattern'
import {sendRes} from '../../utils/requestSend'
import { validateError } from '../../utils/helper'
import { time } from '../../constants'
import User from '../../models/user'

async function validateSuccess(req, res, next, instance) {
  const {username, password, email} = req.body
  const user = await User.findOne({username})

  if (user) {
    sendRes(res, 400, {
      message: '该用户已存在！'
    })
    return
  }
  instance.generatePasswordHash(password).then(({hash, salt}) => {
    User.create({
      username,
      salt,
      password: hash,
      email,
      createTime: Date.now() + time,
      lastLoginTime: Date.now() + time
    }).then(newUser => {

      const token = instance.generateToken({
        username,
        password: hash,
        host: req.hostname
      })
      sendRes(res, 200, {
        accessToken: token,
        uid: newUser._id,
        username: newUser.username
      })
    }).catch(err => next(err))
  }).catch(err => next(err))

}

export default async function (req, res, next, instance) {
  const rules = {
    username: [
      {required: true, message: '缺少username参数！'},
      {type: String, message: 'username参数必须为字符串！'},
      {len: 15, message: 'username参数 不能超过15个字符！'}
    ],
    password: [
      {required: true, message: '缺少password参数！'},
      {type: String, message: 'password参数必须为字符串！'}
    ],
    email: [
      {required: true, message: '缺少email参数！'},
      {regExpPattern: email, message: 'email为非合法email!'}
    ]
  }
  validateParams(req.body, rules, function() {
    validateSuccess(req, res, next, instance).catch(err => {
      next(err)
    })
  }, validateError.bind(null, res))
}
