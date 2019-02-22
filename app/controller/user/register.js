export default async function (req, res, next, instance) {
  const {username, passWord} = req.body
  console.log(username.length, passWord)
  res.send({
    status: 'err',
    message: 'lose'
  })
}
