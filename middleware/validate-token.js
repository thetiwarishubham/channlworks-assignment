const jwt = require('jsonwebtoken');
const config = require('../config/config')
const extractTokenFromHeader = (req) => {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		return req.headers.authorization.split(' ')[1];
	} return undefined;
};


exports.validateToken = async (req, res, next) => {
	try {
		const token = extractTokenFromHeader(req);
		if (!token) {
			return res
				.status(401)
				.send({ message: 'Not Authenticated Token Missing', done: false });
		}
		const check = jwt.verify(token, config.JWT_SECRET);
		if (!check) {
			return res
				.status(401)
				.send({ message: 'Not Authenticated', done: false });
		}
		if(!check.userID){
			return res
			.status(401)
			.send({ message: 'Please login again.', done: false });
		}
		req.user = check;
		next();
	} catch (err) {
		return res.status(401).send({ message: err, done: false });
	}
};