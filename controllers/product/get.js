const { ProductProvider } = require('../../providers/product');
const httperror = require('http-errors');

class GetProduct {
    constructor(productId) {
        this.productId = productId;
    }
    async execute() {
        try {
            const productProvider = new ProductProvider();
            const result = await productProvider.getById(this.productId);
            if (!result) {
                throw new httperror(404, `Product not exists.`);
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetProduct = GetProduct;