const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

const createProduct = async (productBody) => {
    const product = await Product.create(productBody);
    return product;
};

const queryProducts = async (filter, options) => {
    const products = await Product.paginate(filter, options);
    return products;
};

const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    return product;
};

const updateProductById = async (productId, updateBody) => {
    const product = await getProductById(productId);
    Object.assign(product, updateBody);
    await product.save();
    return product;
};

const deleteProductById = async (productId) => {
    const product = await getProductById(productId);
    await product.remove();
    return product;
};

module.exports = {
    createProduct,
    queryProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};