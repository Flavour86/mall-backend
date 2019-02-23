import isFunction from 'lodash/isFunction'

class Base {
  catchErrorHandler (fn) {
    const self = this
    return (req, res, next) => {
      try {
        const controllerFn = fn.apply(self, [req, res, next, self])
        if (controllerFn && controllerFn.then && isFunction(controllerFn.then)) {
          controllerFn.catch(err => {
            next(err)
          })
        }
      } catch (e) {
        next(e)
      }
    }
  }

  bindFnToInstance (fnObject) {
    if (Object.prototype.toString.call(fnObject) !== '[object Object]') {
      throw `该参数必须是一个对象`
    }
    Object.keys(fnObject).forEach(key => {
      this[key] = this.catchErrorHandler(fnObject[key])
    })
  }
}

export default Base
