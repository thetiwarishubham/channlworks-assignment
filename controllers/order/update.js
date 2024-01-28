const { OrderProvider } = require('../../providers/order');
const httperror = require('http-errors');

class UpdateOrder {
    constructor(orderId, updateObj) {
        this.orderId = orderId;
        this.updateObj = updateObj;
    }
    async execute() {
        try {
            const orderProvider = new OrderProvider();
            const result = await orderProvider.update(this.orderId, this.updateObj);
            if (!result) {
                throw new httperror(400, `Bad Request.`);
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.UpdateOrder = UpdateOrder;