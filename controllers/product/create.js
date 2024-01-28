const { ProductProvider } = require('../../providers/product');
const httperror = require('http-errors');

class CreateProduct {
    constructor(createObj) {
        this.createObj = createObj;
    }

    async execute() {
        try {
            const productProvider = new ProductProvider();
            await productProvider.create(this.createObj);
            return 'Product Created Successfully';
        } catch (error) {
            throw error;
        }
    }
}

exports.CreateProduct = CreateProduct;