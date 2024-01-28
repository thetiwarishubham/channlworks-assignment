const express = require('express');
const router = express.Router();

const {
	productIdValidation,
	createReviewValidation,
} = require('../helper/request-validation/review');
const { ControllerManager } = require('../../controllers/controller-manager');

const { ListReviewByProductId } = require('../../controllers/review/list');
const { CreateReview } = require('../../controllers/review/create');


router.route('/:productId').get(productIdValidation, function (req, res, next) {
	const productId = req.params.productId;
	const controller = new ListReviewByProductId(productId);
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

router.route('/:productId').post(productIdValidation, createReviewValidation, function (req, res, next) {
	const productId = req.params.productId;
	const createObj = req.body;
	const controller = new CreateReview(productId, createObj);
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