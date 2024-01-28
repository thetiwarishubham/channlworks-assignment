const { ProductProvider } = require('../../providers/product');
const { OrderProvider } = require('../../providers/order');
const httperror = require('http-errors');

class CreateOrder {
    constructor(createObj) {
        this.createObj = createObj;
    }
    async execute() {
        try {
            await this.validateProductIds();
            const orderProvider = new OrderProvider();
            await orderProvider.create(this.createObj);
            return 'Order Created Successfully.';
        } catch (error) {
            throw error;
        }
    }

    async validateProductIds() {
        try {
            const products = this.createObj.products;
            const productProvider = new ProductProvider();
            for (const product of products) {
                const isProductExists = await productProvider.count(product.productId);
                if (!isProductExists) {
                    throw new httperror(404, `Product not exists.`);
                }
            }
        } catch (error) {
            throw error;
        }
    }
}

exports.CreateOrder = CreateOrder;