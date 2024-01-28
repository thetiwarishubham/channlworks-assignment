const OrderModel = require('../models/order');
const httperror = require('http-errors');

class OrderProvider {

	async list(userId) {
		try {
			const result = await OrderModel.find({userId: userId}).lean();
			return result;
		} catch (error) {
			throw error;
		}
	}


	async create(createBody) {
		try {
			const result = await OrderModel.create(createBody);
			return result;
		} catch (error) {
			throw error;
		}
	}

	async update(orderId, updateObj) {
		try {
			const result = await OrderModel.findOneAndUpdate({ _id: orderId }, updateObj, { new: true }).lean();
			return result;
		} catch (error) {
			throw error;
		}
	}
}


exports.OrderProvider = OrderProvider;