const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

// Route cho việc tạo, lấy, cập nhật và xóa giỏ hàng
router
    .route('/')
    .post(auth(), validate(cartValidation.createCart), cartController.createCart)  // Tạo giỏ hàng
    .get(auth(), cartController.getCart)  // Lấy giỏ hàng của user
    .patch(auth(), validate(cartValidation.updateCart), cartController.updateCart)  // Cập nhật giỏ hàng
    .delete(auth(), cartController.deleteCart);  // Xóa giỏ hàng

// Route cho việc quản lý sản phẩm trong giỏ hàng (thêm, sửa, xóa sản phẩm)
router
    .route('/item/:productId')
    .get(auth(), validate(cartValidation.getCartItem), cartController.getCartItem)  // Lấy sản phẩm trong giỏ hàng
    .patch(auth(), validate(cartValidation.updateCartItem), cartController.updateCartItem)  // Cập nhật sản phẩm trong giỏ hàng
    .delete(auth(), validate(cartValidation.deleteCartItem), cartController.deleteCartItem);  // Xóa sản phẩm khỏi giỏ hàng

// Route kiểm tra tính hợp lệ của sản phẩm trong giỏ hàng
router
    .route('/validate/:productId')
    .get(auth(), validate(cartValidation.validateCartItem), cartController.validateCartItem);

// Route cho việc thêm sản phẩm vào giỏ hàng (addToCart)
router
    .route('/add')
    .post(auth(), validate(cartValidation.addToCart), cartController.addToCart);  // Thêm sản phẩm vào giỏ hàng

module.exports = router;
