const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');


const createProduct = catchAsync(async (req, res) => {
    const productData = req.body;
    const product = await productService.createNewProduct(productData);
    res.status(httpStatus.CREATED).json(product);
});


const getProducts = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['brand', 'minPrice', 'maxPrice', 'color', 'size', 'inStock']);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'order']);
    const result = await productService.getProducts(filter, options);
    res.status(httpStatus.OK).json(result);
});


const filterProducts = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['brand', 'minPrice', 'maxPrice', 'color', 'size', 'hasQuantity']);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'order']);
    const result = await productService.filterProducts(filter, options);
    res.status(httpStatus.OK).json(result);
});


const searchProductsByName = catchAsync(async (req, res) => {
    const { name, exact } = req.query;
    const options = pick(req.query, ['page', 'limit']);
    const result = await productService.searchProductsByName(name, options, exact === 'true');
    res.status(httpStatus.OK).json(result);
});


const getProductById = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const product = await productService.getProductById(productId);
    res.status(httpStatus.OK).json(product);
});


const updateProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const productData = req.body;
    const updatedProduct = await productService.updateProduct(productId, productData);
    res.status(httpStatus.OK).json(updatedProduct);
});


const deleteProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    await productService.deleteProduct(productId);
    res.status(httpStatus.NO_CONTENT).send();
});


const updateProductQuantities = catchAsync(async (req, res) => {
    const { productId, updates } = req.body;
    const updatedProduct = await productService.updateProductQuantities(productId, updates);
    res.status(httpStatus.OK).json(updatedProduct);
});

module.exports = {
    createProduct,
    getProducts,
    filterProducts,
    searchProductsByName,
    getProductById,
    updateProduct,
    deleteProduct,
    updateProductQuantities,
};