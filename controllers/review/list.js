const { ReviewProvider } = require('../../providers/review');
const httperror = require('http-errors');

class ListReviewByProductId {
    constructor(productId) {
        this.productId = productId;
    }
    async execute() {
        try {
            const reviewProvider = new ReviewProvider();
            const result = await reviewProvider.list(this.productId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.ListReviewByProductId = ListReviewByProductId;