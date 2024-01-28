const ReviewModel = require('../models/review');
const mongoose = require('mongoose');
const httperror = require('http-errors');

class ReviewProvider {

	async list(productId) {
		try {
			const condition = { productId: productId };
			const result = await ReviewModel.find(condition).lean();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async getConsolidatedRating(productId) {
		try {
			const pipeline = [
				{
					$match: { productId: mongoose.Types.ObjectId(productId) },
				},
				{
					$group: {
						_id: null,
						averageRating: { $avg: "$rating" },
					},
				},
				{
					$project: {
						averageRating: { $round: ["$averageRating", 1] },
					},
				}
			];
			const result = await ReviewModel.aggregate(pipeline);
			const consolidatedRating = result.length > 0 ? result[0].averageRating : null;
			return consolidatedRating;
		} catch (error) {
			throw error;
		}
	}

	async create(createBody) {
		try {
			const result = await ReviewModel.create(createBody);
			return result;
		} catch (error) {
			throw error;
		}
	}

	async deleteByProductId(productId) {
		try {
			const condition = { productId: { $in: productId } };
			const result = await ReviewModel.deleteMany(condition);
			return result;
		} catch (error) {
			throw error;
		}
	}
}


exports.ReviewProvider = ReviewProvider;