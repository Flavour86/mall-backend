import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import assert from 'assert'

const strategyList = {
  require: function (rule, value, message) {
    if (rule['require'] && (value === undefined || value === null)) {
      throw message
    }
  }
}

const getValidateType = rule => {

}

/**
 *
 * @param params object  需要验证的对象
 * @param rule  object
 * @param callback fn
 *
 * @参数结构
 * params: {
 *   username: 'aa'
 * }
 * rule: {
 *   username: [
 *     {required: true, message: '缺少username参数！'},
 *     {type: String, message: 'username参数必须为string！'},
 *     {len: 10, message: 'username 最大长度为10'},
 *     {validator: function (value, callback) {
 *       if (value.length > 100) {
 *          throw 'username 最大长度不能超过100'
 *       }
 *     }}
 *   ]
 * }
 * callback: function (err) {
 *   console.log(err)
 * }
 */
const validateParams = (params, rule, callback) => {
  assert(Object.prototype.call(params) === '[object Object]', 'params 参数必须是object！')
  assert(Object.prototype.call(rule) === '[object Object]', 'rule 参数必须是object！')
  assert(isFunction(callback), 'callback 参数必须是function！')
  Object.keys(params).forEach(field => {
    const rules = rule[field]
    assert(isArray(rules), `rule.${field}必须是一个数组！`)
    rules.forEach(ruleItem => {

    })
  })
}

export default validateParams
