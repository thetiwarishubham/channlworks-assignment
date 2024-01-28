const { ProductProvider } = require('../../providers/product');
const { ReviewProvider } = require('../../providers/review');
const httperror = require('http-errors');

class DeleteProduct {
    constructor(productId) {
        this.productId = productId;
    }
    async execute() {
        try {
            const productProvider = new ProductProvider();
            const reviewProvider = new ReviewProvider();
            const product = await productProvider.delete(this.productId);
            if (!product) {
                throw new httperror(400, `Bad Request.`);
            }
            await reviewProvider.deleteByProductId(this.productId);
            return 'Deleted Successfully.';
        } catch (error) {
            throw error;
        }
    }
}

exports.DeleteProduct = DeleteProduct;