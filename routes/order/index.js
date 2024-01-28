const express = require('express');
const router = express.Router();

const {
	userIdValidation,
	orderIdValidation,
	createOrderValidation,
	updateOrderValidation,
} = require('../helper/request-validation/order');
const { ControllerManager } = require('../../controllers/controller-manager');

const { GetOrderByUserId } = require('../../controllers/order/get-by-userId');
const { CreateOrder } = require('../../controllers/order/create');
const { UpdateOrder } = require('../../controllers/order/update');


router.route('/:userId').get(userIdValidation, function (req, res, next) {
	const userId = req.params.userId;
	const controller = new GetOrderByUserId(userId);
	ControllerManager.execute(controller)
		.then(data => {
			const response = {
				data: data
			};
			res.status(200).send(response);
		})
		.catch(error => {
			const response = {
				data: error.message
			};
			res.status(error.status || 400).send(response);
		});
});

router.route('/').post(createOrderValidation, function (req, res, next) {
	const createObj = req.body;
	const controller = new CreateOrder(createObj);
	ControllerManager.execute(controller)
		.then(data => {
			const response = {
				data: data
			};
			res.status(200).send(response);
		})
		.catch(error => {
			const response = {
				data: error.message
			};
			res.status(error.status || 400).send(response);
		});
});


router.route('/:orderId').patch(orderIdValidation, updateOrderValidation, function (req, res, next) {
	const orderId = req.params.orderId;
	const updateObj = req.body;
	const controller = new UpdateOrder(orderId, updateObj);
	ControllerManager.execute(controller)
		.then(data => {
			const response = {
				data: data
			};
			res.status(200).send(response);
		})
		.catch(error => {
			const response = {
				data: error.message
			};
			res.status(error.status || 400).send(response);
		});
});

module.exports = router