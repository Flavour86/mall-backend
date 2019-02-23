export default {
  required: function (rule, value) {
    if (rule['required'] && (value === undefined || value === null)) {
      throw rule.message
    }
  },
  type: function (rule, value) {
    const valType = Object.prototype.toString.call(value).replace('[object ', '').replace(']', '')
    if (valType !== rule['type'].name) {
      throw rule.message
    }
  },
  len: function (rule, value) {
    if (rule.len && value.length && value.length > rule.len) {
      throw rule.message
    }
  }
}
