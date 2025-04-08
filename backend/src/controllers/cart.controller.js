// controllers/cart.controller.js
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');

const createCart = catchAsync(async (req, res) => {
    const cart = await cartService.createCart(req.user.id, req.body);
    res.status(httpStatus.CREATED).send(cart);
});


const getCart = catchAsync(async (req, res) => {
    const cart = await cartService.getCartByUserId(req.user.id);
    res.send(cart);
});


const updateCart = catchAsync(async (req, res) => {
    const cart = await cartService.updateCart(req.user.id, req.body);
    res.send(cart);
});


const deleteCart = catchAsync(async (req, res) => {
    await cartService.deleteCart(req.user.id);
    res.status(httpStatus.NO_CONTENT).send();
});


const deleteCartItem = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const { color, size } = req.body;
    const cart = await cartService.deleteCartItem(req.user.id, productId, color, size);
    res.send(cart);
});


const getCartItem = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const { color, size } = req.body;
    const item = await cartService.getCartItem(req.user.id, productId, color, size);
    res.send(item);
});


const updateCartItem = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const { quantity, color, size } = req.body;

    const cart = await cartService.updateCartItem(req.user.id, productId, quantity, color, size);
    res.send(cart);
});

module.exports = {
    updateCartItem,
};
const addToCart = catchAsync(async (req, res) => {
    const { productId, name, image_url, brand, price, quantity, color, size } = req.body;

    // Kiểm tra các giá trị đã được gửi lên
    if (!productId || !color || !size) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Thiếu thông tin sản phẩm." });
    }

    if (isNaN(quantity) || quantity < 1) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Số lượng phải là số nguyên và lớn hơn hoặc bằng 1." });
    }

    try {
        const cart = await cartService.addToCart(req.user.id, { productId, name, image_url, brand, price, quantity, color, size });
        return res.status(httpStatus.CREATED).send(cart);
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Lỗi server khi thêm vào giỏ hàng" });
    }
});


const validateCartItem = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const { color, size } = req.body;
    const isValid = await cartService.validateCartItem(req.user.id, productId, color, size);
    res.send({ exists: isValid });
});


module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart,
    deleteCartItem,
    getCartItem,
    updateCartItem,
    addToCart,
    validateCartItem,
};
