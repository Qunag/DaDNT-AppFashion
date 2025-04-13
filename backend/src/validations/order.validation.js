const Joi = require('joi');
const { objectId } = require('./custom.validation');

const orderItemSchema = Joi.object({
    productId: Joi.string().custom(objectId).required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().min(1).required(),
    color_name: Joi.string().required(),
    size: Joi.string().required(),
    image_url: Joi.string().uri().required(),
});

const createOrder = {
    body: Joi.object().keys({
        items: Joi.array().items(orderItemSchema).min(1).required(),
    }),
};

const getOrder = {
    params: Joi.object().keys({
        orderId: Joi.string().custom(objectId).required(),
    }),
};

const updateOrderStatus = {
    params: Joi.object().keys({
        orderId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required(),
    }),
};

const cancelOrder = {
    params: Joi.object().keys({
        orderId: Joi.string().custom(objectId).required(),
    }),
};

module.exports = {
    createOrder,
    getOrder,
    updateOrderStatus,
    cancelOrder,
};