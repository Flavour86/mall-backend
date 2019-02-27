import Token from '../../models/tokens'
import {time} from "../../constants";
import {sendRes} from "../../utils/requestSend";

export default async function (req, res, next, instance) {
  const { authorization } = req.headers
  try {
    await Token.create({
      token: authorization,
      expiredDate: Date.now() + time
    })
  }catch (e) {
    return next(e)
  }
  sendRes(res, 200, {
    message: '注销成功！'
  })
}
