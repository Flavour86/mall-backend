import Base from '../common/base'
import Login from './login'
const controllerCallback = {
  Login
}

class User extends Base {
  constructor() {
    super()

    Object.keys(controllerCallback).forEach(key => {

      this[key] = (...args) => {
        controllerCallback[key].apply(this, [...args, this])
      }
    })
  }
}

export default new User()
