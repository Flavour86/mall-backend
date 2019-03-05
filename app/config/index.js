module.exports = {
  port: 3030,         //启动端口
  DB_URL: 'mongodb://129.204.203.111:27017/mall',    //数据库地址
  notifyUrl: 'http://39.108.3.12:3000/v1/notify_url',      //支付异步通知地址
  synNotifyUrl: 'http://39.108.3.12',              //客户端同步跳转
  sessionStorageURL: 'mongodb://129.204.203.111:27017/mall-session',   //数据库存放session地址
}
