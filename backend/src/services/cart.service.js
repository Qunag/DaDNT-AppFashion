const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new cart for a user
 * @param {Object} cartBody - Cart data with products array
 * @param {string} userId - User ID
 * @returns {Promise<Cart>}
 */
const createCart = async (cartBody, userId) => {
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Cart already exists for this user');
    }

    const cartData = {
        userId,
        products: cartBody.products,
    };
    return Cart.create(cartData);
};

/**
 * Get user's cart
 * @param {string} userId - User ID
 * @returns {Promise<Cart>}
 */
const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    return cart;
};

/**
 * Update user's cart
 * @param {string} userId - User ID
 * @param {Object} updateBody - Updated cart data with products array
 * @returns {Promise<Cart>}
 */
const updateCart = async (userId, updateBody) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }

    cart.products = updateBody.products;
    await cart.save();
    return cart;
};

/**
 * Delete user's cart
 * @param {string} userId - User ID
 * @returns {Promise<void>}
 */
const deleteCart = async (userId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    await cart.deleteOne();
};

/**
 * Delete a cart item
 * @param {string} userId - User ID
 * @param {string} productId - Product ID to remove
 * @returns {Promise<Cart>}
 */
const deleteCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }

    const itemIndex = cart.products.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found in cart');
    }

    cart.products.splice(itemIndex, 1);
    await cart.save();
    return cart;
};

/**
 * Get a specific cart item
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>}
 */
const getCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }

    const cartItem = cart.products.find((item) => item.productId.toString() === productId);
    if (!cartItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found in cart');
    }

    return cartItem;
};

/**
 * Update a cart item's quantity
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {Promise<Cart>}
 */
const updateCartItem = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }

    const cartItem = cart.products.find((item) => item.productId.toString() === productId);
    if (!cartItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found in cart');
    }

    cartItem.quantity = quantity;
    await cart.save();
    return cart;
};

/**
 * Validate if a product exists in cart
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @returns {Promise<boolean>}
 */
const validateCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return false;
    }

    return cart.products.some((item) => item.productId.toString() === productId);
};

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