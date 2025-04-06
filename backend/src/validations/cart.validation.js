// validations/cart.validation.js
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const cartItemSchema = Joi.object({
    product: Joi.string().custom(objectId).required(),
    quantity: Joi.number().integer().min(1).required(),
});

const createCart = {
    body: Joi.object().keys({
        items: Joi.array().items(cartItemSchema).min(1).required(),
    }),
};

const updateCart = {
    body: Joi.object().keys({
        items: Joi.array().items(cartItemSchema).min(1).required(),
    }),
};

const updateCartItem = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        quantity: Joi.number().integer().min(1).required(),
    }),
};

const deleteCartItem = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId).required(),
    }),
};

const getCartItem = deleteCartItem;
const validateCartItem = deleteCartItem;

module.exports = {
    createCart,
    updateCart,
    updateCartItem,
    deleteCartItem,
    getCartItem,
    validateCartItem,
};