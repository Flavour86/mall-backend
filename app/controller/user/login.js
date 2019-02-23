export default function (req, res, next, instance) {
  console.log(req.url, instance)
  res.status(200).send({
    message: 'login ok'
  })
}
