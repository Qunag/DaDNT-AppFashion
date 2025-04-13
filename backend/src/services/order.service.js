const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');


const createOrder = async (userId, orderBody) => {
    const { items } = orderBody;

    // Kiểm tra giỏ hàng để đảm bảo các sản phẩm hợp lệ
    const cart = await Cart.findOne({ user: userId });
    if (!cart || !cart.items.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Cart is empty');
    }

    // Tính tổng số tiền
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Tạo đơn hàng
    const order = await Order.create({
        user: userId,
        items,
        totalAmount,
    });

    // Xóa giỏ hàng sau khi tạo đơn hàng
    await Cart.findOneAndDelete({ user: userId });

    return order;
};

const getOrdersByUserId = async (userId) => {
    const orders = await Order.find({ user: userId }).populate('items.productId');
    return orders;
};

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('items.productId');
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    return order;
};

const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    return order;
};

const cancelOrder = async (orderId, userId) => {
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found or not authorized');
    }
    if (order.status !== 'pending') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Only pending orders can be cancelled');
    }
    order.status = 'cancelled';
    await order.save();
    return order;
};

module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
};