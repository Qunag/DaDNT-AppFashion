const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const orderService = require('../services/order.service');

const createOrder = catchAsync(async (req, res) => {
    const order = await orderService.createOrder(req.user.id, req.body);
    res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
    const orders = await orderService.getOrdersByUserId(req.user.id);
    res.send(orders);
});

const getOrder = catchAsync(async (req, res) => {
    const order = await orderService.getOrderById(req.params.orderId);
    res.send(order);
});

const updateOrderStatus = catchAsync(async (req, res) => {
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(req.params.orderId, status);
    res.send(order);
});

const cancelOrder = catchAsync(async (req, res) => {
    const order = await orderService.cancelOrder(req.params.orderId);
    res.status(httpStatus.OK).send(order);
});

const confirmOrder = catchAsync(async (req, res) => {
    const order = await orderService.confirmOrder(req.params.orderId, req.user.id);
    res.send(order);
}
);

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus,
    cancelOrder,
    confirmOrder,

};