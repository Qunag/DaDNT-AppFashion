// validations/cart.validation.js
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const cartItemSchema = Joi.object({
    productId: Joi.string().custom(objectId).required(),
    quantity: Joi.number().integer().min(1).required(),
    color: Joi.string().required(),
    size: Joi.string().required(),
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

const addToCart = {
    body: Joi.object().keys({
        productId: Joi.string().custom(objectId).required(),
        quantity: Joi.number().integer().min(1).default(1),
        color: Joi.string().required(),
        size: Joi.string().required(),
        image_url: Joi.string().uri().required(),
        name: Joi.string().required(),
        brand: Joi.string().required(),
        price: Joi.number().required(),
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
    addToCart,
    updateCartItem,
    deleteCartItem,
    getCartItem,
    validateCartItem,
};