const Joi = require('joi');
const { objectId } = require('./custom.validation');


const cartItemSchema = Joi.object({
    _id: Joi.string().custom(objectId).optional(),
    productId: Joi.string().custom(objectId).required().messages({
        'string.empty': 'Product ID is required',
        'string.custom': 'Product ID must be a valid ObjectId'
    }),
    name: Joi.string().required().messages({
        'string.empty': 'Product name is required'
    }),
    brand: Joi.string().required().messages({
        'string.empty': 'Product brand is required'
    }),
    price: Joi.number().required().messages({
        'number.base': 'Product price is required'
    }),
    image_url: Joi.string().required().messages({
        'string.empty': 'Product image URL is required'
    }),
    color: Joi.string().required().messages({
        'string.empty': 'Product color is required'
    }),
    size: Joi.number().required().messages({
        'number.base': 'Product size is required'
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'Product quantity is required',
        'number.integer': 'Product quantity must be an integer',
        'number.min': 'Product quantity must be at least 1'
    }),
});

const createCart = {
    body: Joi.object().keys({
        products: Joi.array().items(cartItemSchema).min(1).required().messages({
            'array.min': 'At least one product is required'
        }),
    }),
};


const getCart = {
    params: Joi.object().keys({}),
};


const updateCart = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId).required().messages({
            'string.empty': 'User ID is required',
            'string.custom': 'User ID must be a valid ObjectId'
        }),
    }),
    body: Joi.object().keys({
        products: Joi.array().items(cartItemSchema).required().messages({
            'array.min': 'At least one product is required'
        }),
    }),
};



const deleteCart = {
    params: Joi.object().keys({}),
};



const deleteCartItem = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId).required().messages({
            'string.empty': 'User ID is required',
            'string.custom': 'User ID must be a valid ObjectId'
        }),
        productId: Joi.string().custom(objectId).required().messages({
            'string.empty': 'Product ID is required',
            'string.custom': 'Product ID must be a valid ObjectId'
        }),
    }),
};


const getCartItem = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId).required().messages({
            'string.empty': 'Product ID is required',
            'string.custom': 'Product ID must be a valid ObjectId'
        }),
    }),
};

const updateCartItem = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId).required().messages({
            'string.empty': 'Product ID is required',
            'string.custom': 'Product ID must be a valid ObjectId'
        }),
    }),
    body: Joi.object().keys({
        quantity: Joi.number().integer().min(1).required().messages({
            'number.base': 'Product quantity is required',
            'number.integer': 'Product quantity must be an integer',
            'number.min': 'Product quantity must be at least 1'
        }),
    }),
};

const validateCartItem = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId).required().messages({
            'string.empty': 'User ID is required',
            'string.custom': 'User ID must be a valid ObjectId'
        }),
        productId: Joi.string().custom(objectId).required().messages({
            'string.empty': 'Product ID is required',
            'string.custom': 'Product ID must be a valid ObjectId'
        }),
    }),
};


module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart,
    deleteCartItem,
    getCartItem,
    updateCartItem,
    validateCartItem
};
