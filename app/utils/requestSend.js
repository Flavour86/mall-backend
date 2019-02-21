const isFunction = require ('lodash/isFunction')
const assert = require('assert');

export const sendRes = (res, code, message, data) => {
  if (!res || !isFunction(res.send)) {

  }
}
