
export default async function (req, res, next, instance) {
  const {userName, passWord} = req
  console.log(userName.length, passWord)
  res.send({
    status: 'err',
    message: 'lose'
  })
}
