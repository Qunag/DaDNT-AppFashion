// services/cart.service.js
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Cart = require('../models/cart.model');

const getCartByUserId = async (userId) => {
    return Cart.findOne({ user: userId }).populate('items.product');
};

const createCart = async (userId, cartBody) => {
    const existingCart = await Cart.findOne({ user: userId });
    if (existingCart) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Cart already exists');
    }
    return Cart.create({ user: userId, items: cartBody.items });
};

const updateCart = async (userId, cartBody) => {
    const cart = await Cart.findOneAndUpdate({ user: userId }, { items: cartBody.items }, { new: true });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    return cart;
};

const deleteCart = async (userId) => {
    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    return cart;
};

const deleteCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    return cart;
};

const getCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found in cart');
    return item;
};

const updateCartItem = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found in cart');
    item.quantity = quantity;
    await cart.save();
    return cart;
};

const validateCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    return cart.items.some((item) => item.product.toString() === productId);
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
