const express = require('express');
const router = express.Router();

const { filterValidation } = require('../helper/request-validation/filter');
const { ControllerManager } = require('../../controllers/controller-manager');

const { GetAllProductsByFilters } = require('../../controllers/filter/list');

router.route('/').get(filterValidation, function (req, res, next) {
	const queryParams = req.query;
	let controller = new GetAllProductsByFilters(queryParams);
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