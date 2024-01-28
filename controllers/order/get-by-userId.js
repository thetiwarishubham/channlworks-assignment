const { OrderProvider } = require('../../providers/order');

class GetOrderByUserId {
    constructor(userId) {
        this.userId = userId;
    }
    async execute() {
        try {
            const orderProvider = new OrderProvider();
            const orderResult = await orderProvider.list(this.userId);
            return orderResult;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetOrderByUserId = GetOrderByUserId;