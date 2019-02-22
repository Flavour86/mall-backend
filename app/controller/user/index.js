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
    this.bindFnToInstance(controllerCallback)
  }
}

export default new User()
