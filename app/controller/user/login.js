export default function (req, res, next, instance) {
  console.log(req.url, instance)
  res.send({
    status: 200,
    message: 'login ok'
  })
}
