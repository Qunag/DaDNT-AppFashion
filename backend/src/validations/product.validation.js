const Joi = require('joi');

const createProduct = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().allow(''),
        stock: Joi.number().min(0).required(),
    }),
};

const getProducts = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required(),
    }),
};

const updateProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required(),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
            price: Joi.number().min(0),
            description: Joi.string().allow(''),
            stock: Joi.number().min(0),
        })
        .min(1), // Đảm bảo có ít nhất 1 trường để cập nhật
};

const deleteProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required(),
    }),
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};