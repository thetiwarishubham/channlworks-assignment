const { ProductProvider } = require('../../providers/product');

class GetAllProducts {
    constructor() {
    }
    async execute() {
        try {
            const productProvider = new ProductProvider();
            const result = await productProvider.list();
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetAllProducts = GetAllProducts;