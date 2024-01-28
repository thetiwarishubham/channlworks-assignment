const { ProductProvider } = require('../../providers/product');
const { ReviewProvider } = require('../../providers/review');
const httperror = require('http-errors');

class CreateReview {
    constructor(productId, createObj) {
        this.productId = productId;
        this.createObj = createObj;
    }
    async execute() {
        try {
            await this.validateProductId();
            const reviewProvider = new ReviewProvider();
            await reviewProvider.create({...this.createObj, productId: this.productId});
            await this.createReview();
            return 'Review Created Successfully.';
        } catch (error) {
            throw error;
        }
    }

    async validateProductId() {
        try {
            const productProvider = new ProductProvider();
            const isProductExists = await productProvider.count(this.productId);
            if (!isProductExists) {
                throw new httperror(404, `Product not exists.`);
            }
        } catch (error) {
            throw error;
        }
    }

    async createReview() {
        try {
            const reviewProvider = new ReviewProvider();
            const productProvider = new ProductProvider();
            const reviewCount = await reviewProvider.getConsolidatedRating(this.productId);
            console.log('reviewCount', reviewCount);
            productProvider.update(this.productId, {ratings: reviewCount})
        } catch (error) {
            throw error;
        }
    }
}

exports.CreateReview = CreateReview;