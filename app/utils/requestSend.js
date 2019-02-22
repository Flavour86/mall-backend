import isFunction from 'lodash/isFunction'
import assert from 'assert'

export const sendRes = (res, code, message, data) => {
  assert(res || isFunction(res.send), 'res 对象不存在！')
  assert(code || message, '所要发送的状态码或message不存在！')
  res.send({
    status: code,
    message,
    ...data
  })
}
