import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import assert from 'assert'
import strategyList from './strategys'

const insetType = [
  'required',
  'type',
  'len'
]

const getValidateType = rule => {
  assert(isPlainObject(rule), 'rule 参数必须是一个对象！')
  if (!rule.message && rule.validator) {
    return rule.validator
  }
  const ruleType = Object.keys(rule).filter(p => p !== 'message')[0]
  assert(insetType.indexOf(ruleType) > -1, '验证类型不存在，请用validator进行验证')
  return strategyList[ruleType]
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
 *     {validator: function (rule, value) {
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
const validateParams = (params, rule, successCallback, callback) => {
  assert(Object.prototype.toString.call(params) === '[object Object]', 'params 参数必须是object！')
  assert(Object.prototype.toString.call(rule) === '[object Object]', 'rule 参数必须是object！')
  assert(isFunction(callback), 'callback 参数必须是function！')
  assert(isFunction(successCallback), 'successCallback 参数必须是function！')
  try {
    Object.keys(params).forEach(field => {
      const rules = rule[field]
      assert(isArray(rules), `rule.${field}必须是一个数组！`)
      rules.forEach(ruleItem => {
        const validate = getValidateType(ruleItem)
        validate.apply(null, [ruleItem, params[field]])
      })
    })
    successCallback()
  } catch (e) {
    callback(e)
    return
  }
}

export default validateParams
