import Base from '../common/base'
import Login from './login'
import register from './register'

const controllerCallback = {
  Login,
  register
}

class User extends Base {
  constructor() {
    super()

    Object.keys(controllerCallback).forEach(key => {
      this[key] = this.catchErrorHandler(controllerCallback[key])
    })
  }
}

export default new User()
