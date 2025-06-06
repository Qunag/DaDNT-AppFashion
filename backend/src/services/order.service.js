const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const productService = require('./product.service');



const createOrder = async (userId, orderBody) => {
    const { items } = orderBody;

    // Lấy giỏ hàng của người dùng
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Cart is empty');
    }

    // Tính tổng tiền
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Tạo đơn hàng
    const order = await Order.create({
        user: userId,
        items,
        totalAmount,
    });

    // Cập nhật giỏ hàng: chỉ giữ lại sản phẩm chưa được mua
    const updatedItems = cart.items.filter((cartItem) => {
        return !items.some((orderedItem) =>
            orderedItem.productId?.toString() === cartItem.product?.toString() &&
            orderedItem.color_name === cartItem.color &&
            orderedItem.size === cartItem.size
        );
    });


    cart.items = updatedItems;
    await cart.save();

    // Cập nhật lại số lượng sản phẩm còn lại trong kho
    for (const item of items) {
        await productService.decreaseProductQuantities(item.productId, [
            {
                color_name: item.color_name,
                size: item.size,
                quantity: item.quantity,
            }
        ]);
    }

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

const cancelOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }

    // Trả lại số lượng sản phẩm vào kho
    for (const item of order.items) {
        await productService.increaseProductQuantity(item.productId, {
            color_name: item.color_name,
            size: item.size,
            quantity: item.quantity,
        });
    }

    // Xóa đơn hàng
    await Order.findByIdAndDelete(orderId);

    return { message: 'Order has been cancelled and deleted successfully' };
};



const confirmOrder = async (orderId, userId) => {
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found or not authorized');
    }
    if (order.status !== 'pending') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Only pending orders can be confirmed');
    }
    order.status = 'delivered';
    await order.save();
    return order;

};


module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    confirmOrder,
};