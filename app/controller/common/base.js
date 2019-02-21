class Base {
  catchErrorHandler (fn) {
    return (req, res, next) => {
      fn.apply(this, [req, res, next, this]).catch(err => {
        next(err)
      })
    }
  }
}

export default Base
