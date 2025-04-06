const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Cart = require('../models/cart.model');

const getCartByUserId = async (userId) => {
    return Cart.findOne({ userId });
};

const createCart = async (userId, cartBody) => {
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Cart already exists');
    }
    return Cart.create({ userId, ...cartBody });
};

const updateCart = async (userId, cartBody) => {
    const cart = await Cart.findOneAndUpdate({ userId }, cartBody, { new: true });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    return cart;
};

const deleteCart = async (userId) => {
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    return cart;
};

const deleteCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    cart.products = cart.products.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    return cart;
};

const getCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    const item = cart.products.find((item) => item.productId.toString() === productId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found in cart');
    return item;
};

const updateCartItem = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    const item = cart.products.find((item) => item.productId.toString() === productId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found in cart');
    item.quantity = quantity;
    await cart.save();
    return cart;
};

const validateCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    return cart.products.some((item) => item.productId.toString() === productId);
};

module.exports = {
    getCartByUserId,
    createCart,
    updateCart,
    deleteCart,
    deleteCartItem,
    getCartItem,
    updateCartItem,
    validateCartItem,
};
