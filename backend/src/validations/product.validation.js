// src/validations/product.validation.js
const Joi = require('joi');
const { objectId } = require('./custom.validation'); // Validation tùy chỉnh cho ObjectId

// Validation schema cho sizes trong colors
const sizeSchema = Joi.object({
    size: Joi.number().integer().min(0).required().messages({
        'number.base': 'Size must be a number.',
        'number.integer': 'Size must be an integer.',
        'number.min': 'Size must be greater than or equal to 0.',
        'any.required': 'Size is required.',
    }),
    quantity: Joi.number().integer().min(0).required().messages({
        'number.base': 'Quantity must be a number.',
        'number.integer': 'Quantity must be an integer.',
        'number.min': 'Quantity must be greater than or equal to 0.',
        'any.required': 'Quantity is required.',
    }),
});

// Validation schema cho colors
const colorSchema = Joi.object({
    color_name: Joi.string().trim().required().messages({
        'string.base': 'Color name must be a string.',
        'string.empty': 'Color name cannot be empty.',
        'any.required': 'Color name is required.',
    }),
    image_url: Joi.string().uri().trim().required().messages({
        'string.base': 'Image URL must be a string.',
        'string.uri': 'Image URL must be a valid URL.',
        'string.empty': 'Image URL cannot be empty.',
        'any.required': 'Image URL is required.',
    }),
    sizes: Joi.array().items(sizeSchema).min(1).required().messages({
        'array.base': 'Sizes must be an array.',
        'array.min': 'Sizes array must have at least 1 item.',
        'any.required': 'Sizes array is required.',
    }),
});

// Validation cho addNewProduct
const addNewProduct = {
    body: Joi.object().keys({
        name: Joi.string().trim().required().messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name cannot be empty.',
            'any.required': 'Name is required.',
        }),
        brand: Joi.string().trim().required().messages({
            'string.base': 'Brand must be a string.',
            'string.empty': 'Brand cannot be empty.',
            'any.required': 'Brand is required.',
        }),
        price: Joi.number().integer().min(0).required().messages({
            'number.base': 'Price must be a number.',
            'number.integer': 'Price must be an integer.',
            'number.min': 'Price must be greater than or equal to 0.',
            'any.required': 'Price is required.',
        }),
        colors: Joi.array().items(colorSchema).min(1).required().messages({
            'array.base': 'Colors must be an array.',
            'array.min': 'Colors array must have at least 1 item.',
            'any.required': 'Colors array is required.',
        }),
    }),
};

// Validation cho getProducts (query parameters)
const getProducts = {
    query: Joi.object().keys({
        brand: Joi.string().optional().messages({
            'string.base': 'Brand must be a string.',
        }),
        page: Joi.number().integer().min(1).default(1).messages({
            'number.base': 'Page must be a number.',
            'number.integer': 'Page must be an integer.',
            'number.min': 'Page must be greater than or equal to 1.',
        }),
        limit: Joi.number().integer().min(1).default(10).messages({
            'number.base': 'Limit must be a number.',
            'number.integer': 'Limit must be an integer.',
            'number.min': 'Limit must be greater than or equal to 1.',
        }),
        sortBy: Joi.string().optional().messages({
            'string.base': 'SortBy must be a string.',
        }),
        order: Joi.string().valid('asc', 'desc').optional().messages({
            'string.base': 'Order must be a string.',
            'any.only': 'Order must be either "asc" or "desc".',
        }),
    }),
};

// Validation cho getProductById (params)
const getProductById = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId).required().messages({
            'string.base': 'Product ID must be a string.',
            'string.empty': 'Product ID cannot be empty.',
            'any.required': 'Product ID is required.',
            'objectId.invalid': 'Product ID must be a valid ObjectId.',
        }),
    }),
};

// Validation cho searchProductsByName (query parameters)
const searchProductsByName = {
    query: Joi.object().keys({
        name: Joi.string().trim().required().messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name cannot be empty.',
            'any.required': 'Name is required.',
        }),
        page: Joi.number().integer().min(1).default(1).messages({
            'number.base': 'Page must be a number.',
            'number.integer': 'Page must be an integer.',
            'number.min': 'Page must be greater than or equal to 1.',
        }),
        limit: Joi.number().integer().min(1).default(10).messages({
            'number.base': 'Limit must be a number.',
            'number.integer': 'Limit must be an integer.',
            'number.min': 'Limit must be greater than or equal to 1.',
        }),
    }),
};

// Validation cho updateProduct (params và body)
const updateProduct = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId).required().messages({
            'string.base': 'Product ID must be a string.',
            'string.empty': 'Product ID cannot be empty.',
            'any.required': 'Product ID is required.',
            'objectId.invalid': 'Product ID must be a valid ObjectId.',
        }),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string().trim().optional().messages({
                'string.base': 'Name must be a string.',
                'string.empty': 'Name cannot be empty.',
            }),
            brand: Joi.string().trim().optional().messages({
                'string.base': 'Brand must be a string.',
                'string.empty': 'Brand cannot be empty.',
            }),
            price: Joi.number().integer().min(0).optional().messages({
                'number.base': 'Price must be a number.',
                'number.integer': 'Price must be an integer.',
                'number.min': 'Price must be greater than or equal to 0.',
            }),
            colors: Joi.array().items(colorSchema).min(1).optional().messages({
                'array.base': 'Colors must be an array.',
                'array.min': 'Colors array must have at least 1 item.',
            }),
        })
        .min(1)
        .messages({
            'object.min': 'At least one field must be provided for update.',
        }),
};

// Validation cho deleteProduct (params)
const deleteProduct = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId).required().messages({
            'string.base': 'Product ID must be a string.',
            'string.empty': 'Product ID cannot be empty.',
            'any.required': 'Product ID is required.',
            'objectId.invalid': 'Product ID must be a valid ObjectId.',
        }),
    }),
};

// Validation cho updateProductQuantities (body)
const updateProductQuantities = {
    body: Joi.object().keys({
        productId: Joi.string().custom(objectId).required().messages({
            'string.base': 'Product ID must be a string.',
            'string.empty': 'Product ID cannot be empty.',
            'any.required': 'Product ID is required.',
            'objectId.invalid': 'Product ID must be a valid ObjectId.',
        }),
        updates: Joi.array()
            .items(
                Joi.object({
                    color_name: Joi.string().trim().required().messages({
                        'string.base': 'Color name must be a string.',
                        'string.empty': 'Color name cannot be empty.',
                        'any.required': 'Color name is required.',
                    }),
                    size: Joi.number().integer().min(0).required().messages({
                        'number.base': 'Size must be a number.',
                        'number.integer': 'Size must be an integer.',
                        'number.min': 'Size must be greater than or equal to 0.',
                        'any.required': 'Size is required.',
                    }),
                    quantity: Joi.number().integer().min(0).required().messages({
                        'number.base': 'Quantity must be a number.',
                        'number.integer': 'Quantity must be an integer.',
                        'number.min': 'Quantity must be greater than or equal to 0.',
                        'any.required': 'Quantity is required.',
                    }),
                })
            )
            .min(1)
            .required()
            .messages({
                'array.base': 'Updates must be an array.',
                'array.min': 'Updates array must have at least 1 item.',
                'any.required': 'Updates array is required.',
            }),
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