const Joi = require('joi');
const { objectId } = require('./custom.validation');

const sizeSchema = Joi.object({
    _id: Joi.string().custom(objectId).optional(),
    size: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.integer': 'Size must be an integer',
            'number.min': 'Size must be greater than or equal to 0'
        }),
    quantity: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.integer': 'Quantity must be an integer',
            'number.min': 'Quantity must be greater than or equal to 0'
        }),
});

const colorSchema = Joi.object({
    _id: Joi.string().custom(objectId).optional(),
    color_name: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Color name is required'
        }),
    image_url: Joi.string()
        .uri()
        .trim()
        .required()
        .messages({
            'string.uri': 'Image URL must be a valid URL',
            'string.empty': 'Image URL is required'
        }),
    sizes: Joi.array()
        .items(sizeSchema)
        .min(1)
        .required()
        .messages({
            'array.min': 'At least one size is required'
        }),
});

const createProduct = {
    body: Joi.object().keys({
        name: Joi.string()
            .trim()
            .required()
            .messages({
                'string.empty': 'Name is required'
            }),
        brand: Joi.string()
            .trim()
            .required()
            .messages({
                'string.empty': 'Brand is required'
            }),
        price: Joi.number()
            .integer()
            .min(0)
            .required()
            .messages({
                'number.integer': 'Price must be an integer',
                'number.min': 'Price must be greater than or equal to 0'
            }),
        colors: Joi.array()
            .items(colorSchema)
            .min(1)
            .required()
            .messages({
                'array.min': 'At least one color is required'
            }),
    }),
};

const getProducts = {
    query: Joi.object().keys({
        brand: Joi.string().trim().optional(),
        minPrice: Joi.number().min(0).optional(),
        maxPrice: Joi.number()
            .min(0)
            .optional()
            .when('minPrice', {
                is: Joi.exist(),
                then: Joi.number().min(Joi.ref('minPrice')),
            }),
        color: Joi.string().trim().optional(),
        size: Joi.number().integer().min(0).optional(),
        inStock: Joi.boolean().optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(10),
        sortBy: Joi.string()
            .valid('name', 'brand', 'price', 'createdAt')
            .optional(),
        order: Joi.string().valid('asc', 'desc').optional(),
    }),
};

const getProductById = {
    params: Joi.object().keys({
        productId: Joi.string()
            .custom(objectId)
            .required()
            .messages({
                'string.empty': 'Product ID is required'
            }),
    }),
};

const searchProductsByName = {
    query: Joi.object({
        name: Joi.string()
            .trim()
            .required()
            .messages({
                'string.empty': 'Name is required'
            }),
        exact: Joi.boolean().default(false),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(10),
    }),
};

const filterProducts = {
    query: Joi.object().keys({
        brand: Joi.string()
            .trim()
            .optional()
            .messages({
                'string.empty': 'Brand cannot be empty'
            }),
        minPrice: Joi.number()
            .integer()
            .min(0)
            .optional()
            .messages({
                'number.integer': 'Minimum price must be an integer',
                'number.min': 'Minimum price must be greater than or equal to 0'
            }),
        maxPrice: Joi.number()
            .integer()
            .min(0)
            .optional()
            .when('minPrice', {
                is: Joi.exist(),
                then: Joi.number().integer().min(Joi.ref('minPrice')),
                otherwise: Joi.number().integer().min(0)
            })
            .messages({
                'number.integer': 'Maximum price must be an integer',
                'number.min': 'Maximum price must be greater than minPrice'
            }),
        color: Joi.string()
            .trim()
            .optional()
            .messages({
                'string.empty': 'Color cannot be empty'
            }),
        size: Joi.number()
            .integer()
            .min(0)
            .optional()
            .messages({
                'number.integer': 'Size must be an integer',
                'number.min': 'Size must be greater than or equal to 0'
            }),
        hasQuantity: Joi.boolean()
            .optional()
            .default(false)
            .messages({
                'boolean.base': 'hasQuantity must be a boolean'
            }),
        page: Joi.number()
            .integer()
            .min(1)
            .default(1)
            .messages({
                'number.integer': 'Page must be an integer',
                'number.min': 'Page must be greater than or equal to 1'
            }),
        limit: Joi.number()
            .integer()
            .min(1)
            .max(100)
            .default(10)
            .messages({
                'number.integer': 'Limit must be an integer',
                'number.min': 'Limit must be greater than or equal to 1',
                'number.max': 'Limit must be less than or equal to 100'
            }),
        sortBy: Joi.string()
            .valid('name', 'brand', 'price', 'createdAt')
            .optional()
            .messages({
                'any.only': 'SortBy must be one of [name, brand, price, createdAt]'
            }),
        order: Joi.string()
            .valid('asc', 'desc')
            .optional()
            .messages({
                'any.only': 'Order must be one of [asc, desc]'
            }),
    }),
};

const updateProduct = {
    params: Joi.object().keys({
        productId: Joi.string()
            .custom(objectId)
            .required()
            .messages({
                'string.empty': 'Product ID is required'
            }),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string().trim().optional(),
            brand: Joi.string().trim().optional(),
            price: Joi.number()
                .integer()
                .min(0)
                .optional()
                .messages({
                    'number.integer': 'Price must be an integer',
                    'number.min': 'Price must be greater than or equal to 0'
                }),
            colors: Joi.array()
                .items(colorSchema)
                .min(1)
                .optional()
                .messages({
                    'array.min': 'At least one color is required'
                }),
        })
        .min(1)
        .messages({
            'object.min': 'At least one field must be provided for update'
        }),
};

const deleteProduct = {
    params: Joi.object().keys({
        productId: Joi.string()
            .custom(objectId)
            .required()
            .messages({
                'string.empty': 'Product ID is required'
            }),
    }),
};

const updateProductQuantities = {
    body: Joi.object().keys({
        productId: Joi.string()
            .custom(objectId)
            .required()
            .messages({
                'string.empty': 'Product ID is required'
            }),
        updates: Joi.array()
            .items(
                Joi.object({
                    color_name: Joi.string()
                        .trim()
                        .required()
                        .messages({
                            'string.empty': 'Color name is required'
                        }),
                    size: Joi.number()
                        .integer()
                        .min(0)
                        .required()
                        .messages({
                            'number.integer': 'Size must be an integer',
                            'number.min': 'Size must be greater than or equal to 0'
                        }),
                    quantity: Joi.number()
                        .integer()
                        .min(0)
                        .required()
                        .messages({
                            'number.integer': 'Quantity must be an integer',
                            'number.min': 'Quantity must be greater than or equal to 0'
                        }),
                })
            )
            .min(1)
            .required()
            .messages({
                'array.min': 'At least one update is required'
            }),
    }),
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    searchProductsByName,
    filterProducts,
    updateProduct,
    deleteProduct,
    updateProductQuantities,
};