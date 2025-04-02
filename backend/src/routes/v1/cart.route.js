const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(cartValidation.createCart), cartController.createCart)
    .get(auth(), validate(cartValidation.getCart), cartController.getCart)
    .delete(auth(), validate(cartValidation.deleteCart), cartController.deleteCart);

router
    .route('/:userId')
    .patch(auth('manageCart'), validate(cartValidation.updateCart), cartController.updateCart);

router
    .route('/item/:productId')
    .get(auth(), validate(cartValidation.getCartItem), cartController.getCartItem)
    .patch(auth(), validate(cartValidation.updateCartItem), cartController.updateCartItem);

router
    .route('/:userId/item/:productId')
    .delete(auth('manageCart'), validate(cartValidation.deleteCartItem), cartController.deleteCartItem);

router
    .route('/validate/:userId/:productId')
    .get(auth(), validate(cartValidation.validateCartItem), cartController.validateCartItem);

module.exports = router;