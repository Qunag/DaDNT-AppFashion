
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const addNewProduct = catchAsync(async (req, res) => {
    const product = await productService.addNewProduct(req.body);
    res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
    const { brand, page, limit, sortBy, order } = req.query;
    const filter = { brand };
    const pagination = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        sortBy: sortBy || 'created_at',
        order: order || 'desc',
    };
    const result = await productService.getProducts(filter, pagination);
    res.send(result);
});

const getProductById = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.params.productId);
    res.send(product);
});

const searchProductsByName = catchAsync(async (req, res) => {
    const { name, page, limit } = req.query;
    const pagination = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
    };
    const result = await productService.searchProductsByName(name, pagination);
    res.send(result);
});

const updateProduct = catchAsync(async (req, res) => {
    const product = await productService.updateProduct(req.params.productId, req.body);
    res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
    await productService.deleteProduct(req.params.productId);
    res.status(httpStatus.NO_CONTENT).send();
});

const updateProductQuantities = catchAsync(async (req, res) => {
    const { productId, updates } = req.body;
    const updatedProduct = await productService.updateProductQuantities(productId, updates);
    res.send(updatedProduct);
});

module.exports = {
    addNewProduct,
    getProducts,
    getProductById,
    searchProductsByName,
    updateProduct,
    deleteProduct,
    updateProductQuantities,
};