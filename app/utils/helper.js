import {sendRes} from "./requestSend";

export const validateError = (res, err) => {
  sendRes(res, 400, {
    message: err
  })
}
