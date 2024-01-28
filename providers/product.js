const ProductModel = require('../models/product');
const httperror = require('http-errors');

class ProductProvider {

	async list(filter = {}) {
		try {
			const result = await ProductModel.find(filter).lean();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async getById(productId) {
		try {
			const result = await ProductModel.findById({ _id: productId }).lean();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async count(productId) {
		try {
			const result = await ProductModel.countDocuments({ _id: productId });
			return result;
		} catch (error) {
			throw error;
		}
	}

	async create(createBody) {
		try {
			const result = await ProductModel.create(createBody);
			return result;
		} catch (error) {
			throw error;
		}
	}

	async update(productId, updateObj) {
		try {
			const result = await ProductModel.findOneAndUpdate({ _id: productId }, updateObj, { new: true }).lean();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async delete(productId) {
		try {
			const result = await ProductModel.findOneAndDelete({ _id: productId });
			return result;
		} catch (error) {
			throw error;
		}
	}
}


exports.ProductProvider = ProductProvider;