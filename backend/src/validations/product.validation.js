const Joi = require('joi');

const addNewProduct = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        sizes: Joi.array().items(Joi.number()).min(1).required(),
        brand: Joi.string().required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().min(0).required(),
        colors: Joi.array().items(
            Joi.object({
                color_name: Joi.string().required(),
                image_url: Joi.string().uri().required(),
            })
        ),
    }),
};

const getProducts = {
    query: Joi.object().keys({
        brand: Joi.string().optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).default(10),
    }),
};

const getProductById = {
    params: Joi.object().keys({
        productId: Joi.string().required(),
    }),
};

const searchProductsByName = {
    params: Joi.object().keys({
        name: Joi.string().required(),
    }),
};

const updateProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required(),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string().optional(),
            sizes: Joi.array().items(Joi.number()).min(1).optional(),
            brand: Joi.string().optional(),
            price: Joi.number().min(0).optional(),
            quantity: Joi.number().min(0).optional(),
            colors: Joi.array().items(
                Joi.object({
                    color_name: Joi.string().required(),
                    image_url: Joi.string().uri().required(),
                })
            ).optional(),
        })
        .min(1),
};

const deleteProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required(),
    }),
};

const updateProductQuantities = {
    body: Joi.object().keys({
        updates: Joi.array()
            .items(
                Joi.object({
                    productId: Joi.string().required(),
                    quantity: Joi.number().required(), // Có thể âm để trừ
                })
            )
            .min(1)
            .required(),
    }),
};

module.exports = {
    addNewProduct,
    getProducts,
    getProductById,
    searchProductsByName,
    updateProduct,
    deleteProduct,
    updateProductQuantities,
};