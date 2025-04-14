// services/cart.service.js
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const mongoose = require('mongoose');

const getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.productId');
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    return cart;
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



const addToCart = async (userId, { productId, name, image_url, brand, price, quantity, color, size }) => {
    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        // Nếu giỏ hàng chưa tồn tại, tạo mới
        cart = new Cart({ user: userId, items: [] });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng với cùng color và size chưa
    const existingProductIndex = cart.items.findIndex(
        item =>
            item.productId.toString() === productId &&
            item.color === color &&
            item.size === size
    );

    if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có với cùng color và size, cập nhật số lượng
        cart.items[existingProductIndex].quantity += quantity;
    } else {
        // Nếu sản phẩm chưa có hoặc khác color/size, thêm mới vào giỏ hàng
        cart.items.push({ productId, name, image_url, brand, price, quantity, color, size });
    }

    // Lưu giỏ hàng
    await cart.save();

    return cart; // Trả về giỏ hàng đã được cập nhật
};


const deleteCart = async (userId) => {
    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    return cart;
};

const deleteCartItem = async (userId, productId, color, size) => {
    const cart = await Cart.findOne({ user: userId });

    // Kiểm tra xem giỏ hàng có tồn tại không
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    cart.items = cart.items.filter(
        (item) => !(item.productId.toString() === productId && item.color === color && item.size === size)
    );
    await cart.save();
    return cart;
};



const getCartItem = async (userId, productId, color, size) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');

    const item = cart.items.find(
        (item) => item.productId.toString() === productId && item.color === color && item.size === size
    );

    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found in cart');
    return item;
};


// services/cart.service.js
const updateCartItem = async (userId, productId, quantity, color, size) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');

    // Sửa từ item.product thành item.productId
    const item = cart.items.find(
        (item) =>
            item.productId.toString() === productId &&
            item.color === color &&
            item.size === size
    );

    if (!item) {
        console.log('Item not found in cart. Details:', { productId, color, size });
        console.log('Available items:', cart.items.map(i => ({
            productId: i.productId.toString(),
            color: i.color,
            size: i.size
        })));
        throw new ApiError(httpStatus.NOT_FOUND, 'Item not found in cart');
    }

    item.quantity = quantity;

    await cart.save();
    return cart;
};;


const validateCartItem = async (userId, productId, color, size) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');

    return cart.items.some(
        (item) => item.productId.toString() === productId && item.color === color && item.size === size
    );
};


module.exports = {

    createCart,
    updateCart,
    deleteCart,
    deleteCartItem,
    getCartItem,
    updateCartItem,
    validateCartItem,
    addToCart,
    getCartByUserId,
};
