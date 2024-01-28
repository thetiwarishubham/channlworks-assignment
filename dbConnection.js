const mongoose = require('mongoose');
const config = require('./config/config');
// const logger = require('./config/log');
const timestamp = require('./utils/commanFunctions');
let db = mongoose.createConnection(config.mongoDBUri,config.mongoDBOptions);
db.then((data) => {
	console.info(`${timestamp()} MongoDB connected at ${config.mongoDBUri}`)
}).catch((err) => {
	console.error(`${timestamp()} MongoDB connection failed due to ${err}`)
});
module.exports = db;
