const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const addNewProduct = catchAsync(async (req, res) => {
    const product = await productService.addNewProduct(req.body);
    res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
    const filter = { brand: req.query.brand };
    const pagination = { page: parseInt(req.query.page), limit: parseInt(req.query.limit) };
    const result = await productService.getProducts(filter, pagination);
    res.send(result);
});

const getProductById = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.params.productId);
    res.send(product);
});

const searchProductsByName = catchAsync(async (req, res) => {
    const products = await productService.searchProductsByName(req.params.name);
    res.send(products);
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
    const updatedProducts = await productService.updateProductQuantities(req.body.updates);
    res.send(updatedProducts);
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