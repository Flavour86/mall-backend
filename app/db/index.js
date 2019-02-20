import mongoose from 'mongoose';
import config from '../config'

class MongoDBConnect {
  constructor () {
    mongoose.connect(config.DB_URL, {useMongoClient:true});
    mongoose.Promise = global.Promise;
    this.db = mongoose.connection
    this.db.once('open', this.open)
    this.db.on('error', this.error)
    this.db.on('close', this.close)
  }

  open () {
    console.log('Connecting to the database Successfully')
  }

  error (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  }

  close () {
    console.log('The database is disconnected and try to reconnect the database');
    mongoose.connect(config.DB_URL, {server: {auto_reconnect: true}});
  }
}

new MongoDBConnect();
