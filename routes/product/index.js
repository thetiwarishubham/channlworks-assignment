const express = require('express');
const router = express.Router();

const {
	productIdValidation,
	createProductValidation,
	updateProductValidation,
} = require('../helper/request-validation/product');
const { ControllerManager } = require('../../controllers/controller-manager');

const { GetAllProducts } = require('../../controllers/product/list');
const { GetProduct } = require('../../controllers/product/get');
const { CreateProduct } = require('../../controllers/product/create');
const { UpdateProduct } = require('../../controllers/product/update');
const { DeleteProduct } = require('../../controllers/product/delete');

router.route('/:productId').get(productIdValidation, function (req, res, next) {
	const productId = req.params.productId;
	const controller = new GetProduct(productId);
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

router.route('/').get(function (req, res, next) {
	const controller = new GetAllProducts();
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

router.route('/').post(createProductValidation, function (req, res, next) {
	const createObj = req.body;
	const controller = new CreateProduct(createObj);
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

router.route('/:productId').patch(productIdValidation, updateProductValidation, function (req, res, next) {
	const productId = req.params.productId;
	const updateObj = req.body;
	const controller = new UpdateProduct(productId, updateObj);
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

router.route('/:productId').delete(productIdValidation, function (req, res, next) {
	const productId = req.params.productId;
	const controller = new DeleteProduct(productId);
	ControllerManager.execute(controller)
		.then(data => {
			const response = {
				data: data
			};
			res.status(200).send(response);
		})
		.catch(error => {
			const response = {
				error: error.message
			};
			res.status(error.status || 400).send(response);
		});
});


module.exports = router