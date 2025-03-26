const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Add a new product
 * @param {Object} productData - Product data to create
 * @returns {Promise<Product>}
 */
const addNewProduct = async (productData) => {
    const existingProduct = await Product.findOne({ name: productData.name });
    if (existingProduct) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already exists');
    }
    const newProduct = await Product.create(productData);
    return newProduct;
};

/**
 * getget multiple products with pagination and filtering
 * @param {Object} filter - Filter criteria (e.g., { brand: 'Nike' })
 * @param {Object} pagination - Pagination options (e.g., { page: 1, limit: 10 })
 * @returns {Promise<Object>}
 */
const getProducts = async (filter, pagination) => {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const query = {};
    if (filter.brand) {
        query.brand = { $regex: new RegExp(filter.brand, 'i') };
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);

    return {
        results: products,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
    };
};

/**
 * get a single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Product>}
 */
const getProductById = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    return product;
};

/**
 * Search products by name (partial match)
 * @param {string} name - Product name to search
 * @returns {Promise<Product[]>}
 */
const searchProductsByName = async (name) => {
    const products = await Product.find({
        name: { $regex: new RegExp(name, 'i') },
    });
    if (!products.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No products found with this name');
    }
    return products;
};

/**
 * Modify a product
 * @param {string} productId - Product ID
 * @param {Object} productData - Data to update
 * @returns {Promise<Product>}
 */
const updateProduct = async (productId, productData) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    if (productData.name && productData.name !== product.name) {
        const existingProduct = await Product.findOne({ name: productData.name });
        if (existingProduct) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already exists');
        }
    }
    Object.assign(product, productData);
    await product.save();
    return product;
};

/**
 * Remove a product
 * @param {string} productId - Product ID
 * @returns {Promise<Product>}
 */
const deleteProduct = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.deleteOne();
    return product;
};

/**
 * Adjust quantities of one or multiple products
 * @param {Array<{ productId: string, quantity: number }>} quantityUpdates - Array of updates
 * @returns {Promise<Array<Product>>}
 */
const updateProductQuantities = async (quantityUpdates) => {
    const updatedProducts = [];
    for (const { productId, quantity } of quantityUpdates) {
        const product = await Product.findById(productId);
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, `Product with ID ${productId} not found`);
        }
        if (quantity < 0 && product.quantity < Math.abs(quantity)) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Insufficient quantity for product ${product.name}`);
        }
        product.quantity = quantity >= 0 ? quantity : product.quantity + quantity;
        await product.save();
        updatedProducts.push(product);
    }
    return updatedProducts;
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