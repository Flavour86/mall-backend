import isFunction from 'lodash/isFunction'
import assert from 'assert'

export const sendRes = (res, code, data) => {
  assert(res || isFunction(res.send), 'res 对象不存在！')
  assert(code || data, '所要发送的状态码或data不存在！')
  res.status(code).send({
    ...data
  })
}
