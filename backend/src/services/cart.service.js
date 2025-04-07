// services/cart.service.js
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

const getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.productId', 'name price images colors sizes');
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

const addToCart = async (userId, { productId, quantity, color, size }) => {
    let cart = await Cart.findOne({ user: userId });

    // Tìm sản phẩm trong cơ sở dữ liệu
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Sản phẩm không tồn tại");
    }

    // Tìm màu sắc và kích cỡ tương ứng
    const colorItem = product.colors.find((c) => c.color_name === color);
    if (!colorItem) {
        throw new Error("Màu sắc không hợp lệ");
    }

    const sizeItem = colorItem.sizes.find((s) => s.size.toString() === size.toString());
    if (!sizeItem) {
        throw new Error("Kích cỡ không hợp lệ");
    }

    // Kiểm tra số lượng sản phẩm trong kho
    if (sizeItem.quantity < quantity) {
        throw new Error("Số lượng sản phẩm trong kho không đủ");
    }

    // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [{ productId, quantity, color, size }] });
        return cart;
    }

    // Tìm kiếm sản phẩm trong giỏ hàng của người dùng
    const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId && item.color === color && item.size.toString() === size.toString()
    );

    // Nếu sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, quantity, color, size });
    }

    await cart.save();
    return cart;
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
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');

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


const updateCartItem = async (userId, productId, quantity, color, size) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');

    const item = cart.items.find(
        (item) => item.productId.toString() === productId && item.color === color && item.size === size
    );

    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found in cart');
    item.quantity = quantity;
    await cart.save();
    return cart;
};


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
