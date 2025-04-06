const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(cartValidation.createCart), cartController.createCart)

    .delete(auth(), cartController.deleteCart);

router
    .route('/:userId')
    .patch(auth('manageCart'), validate(cartValidation.updateCart), cartController.updateCart)
    .get(auth(), cartController.getCart);

router
    .route('/item/:productId')
    .get(auth(), cartController.getCartItem)
    .patch(auth(), validate(cartValidation.updateCartItem), cartController.updateCartItem);

router
    .route('/:userId/item/:productId')
    .delete(auth('manageCart'), cartController.deleteCartItem);

router
    .route('/validate/:userId/:productId')
    .get(auth(), cartController.validateCartItem);

module.exports = router;
