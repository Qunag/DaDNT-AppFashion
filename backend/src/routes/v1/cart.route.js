// routes/cart.route.js
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(cartValidation.createCart), cartController.createCart)
    .get(auth(), cartController.getCart)
    .patch(auth(), validate(cartValidation.updateCart), cartController.updateCart)
    .delete(auth(), cartController.deleteCart);

router
    .route('/item/:productId')
    .get(auth(), validate(cartValidation.getCartItem), cartController.getCartItem)
    .patch(auth(), validate(cartValidation.updateCartItem), cartController.updateCartItem)
    .delete(auth(), validate(cartValidation.deleteCartItem), cartController.deleteCartItem);

router
    .route('/validate/:productId')
    .get(auth(), validate(cartValidation.validateCartItem), cartController.validateCartItem);

module.exports = router;