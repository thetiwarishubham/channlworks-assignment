const { ProductProvider } = require('../../providers/product');
const httperror = require('http-errors');

class UpdateProduct {
    constructor(productId, updateObj) {
        this.productId = productId;
        this.updateObj = updateObj;
    }
    async execute() {
        try {
            const productProvider = new ProductProvider();
            const result = await productProvider.update(this.productId, this.updateObj);
            if (!result) {
                throw new httperror(400, `Bad Request.`);
            }
            return 'Product Updated Successfully.';
        } catch (error) {
            throw error;
        }
    }
}

exports.UpdateProduct = UpdateProduct;