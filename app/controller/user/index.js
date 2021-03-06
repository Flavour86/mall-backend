import jsonwebtoken from 'jsonwebtoken'
import Base from '../common/base'
import Login from './login'
import register from './register'
import Logout from './logout'
import bcrypt from "bcrypt";
import {secretKey} from '../../constants'
const saltRounds = 10

const controllerCallback = {
  Login,
  register,
  Logout
}

class User extends Base {
  constructor() {
    super()
    this.bindFnToInstance.call(this, controllerCallback)
  }


  generateToken ({username, password, host}) {
    const options = {
      algorithm: 'HS256',
      expiresIn: 60 * 5
    }
    const token = jsonwebtoken.sign({
      username,
      password,
      host
    }, secretKey, options)
    return token
  }

  generatePasswordHash (pw) {
    return new Promise((resolve, reject) => {
      try {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) {
            reject(err)
            return
          }
          bcrypt.hash(pw, salt, function (err, hash) {
            if (err) {
              reject(err)
              return
            }
            resolve({hash, salt})
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default new User()
