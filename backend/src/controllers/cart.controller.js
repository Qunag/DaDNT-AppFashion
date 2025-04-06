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
    const cart = await cartService.deleteCartItem(req.user.id, req.params.productId);
    res.send(cart);
});

const getCartItem = catchAsync(async (req, res) => {
    const item = await cartService.getCartItem(req.user.id, req.params.productId);
    res.send(item);
});

const updateCartItem = catchAsync(async (req, res) => {
    const cart = await cartService.updateCartItem(req.user.id, req.params.productId, req.body.quantity);
    res.send(cart);
});

const validateCartItem = catchAsync(async (req, res) => {
    const isValid = await cartService.validateCartItem(req.user.id, req.params.productId);
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
    validateCartItem,
};
