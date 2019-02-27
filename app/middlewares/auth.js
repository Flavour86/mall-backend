import {sendRes} from '../utils/requestSend'
import jsonwebtoken from 'jsonwebtoken'
import {secretKey} from '../constants'
import Token from '../models/tokens'

export default function (req, res, next) {
  const {headers: {authorization}} = req
  if (!authorization) {
    return sendRes(res, 401, {
      message: '未登录'
    })
  }

  jsonwebtoken.verify(authorization, secretKey, function (err, decode) {
    if (err) {
      return sendRes(res, 401, {
        message: '无效的令牌'
      })
    }

    Token.findOne({token: authorization}).then(expToken => {
       if (!expToken) {
         return next()
       }
      return sendRes(res, 401, {
        message: '无效的令牌'
      })
    })
  })
}
