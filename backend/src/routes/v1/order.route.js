const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
    .route('/')
    .get(auth(''), orderController.getOrders);

router
    .route('/create')
    .post(auth('createOrder'), validate(orderValidation.createOrder), orderController.createOrder);

router
    .route('/:orderId')
    .get(auth(''), validate(orderValidation.getOrder), orderController.getOrder);

router
    .route('/update-status/:orderId')
    .patch(auth('admin'), validate(orderValidation.updateOrderStatus), orderController.updateOrderStatus);

router
    .route('/cancel/:orderId')
    .patch(auth(''), validate(orderValidation.cancelOrder), orderController.cancelOrder);

module.exports = router;