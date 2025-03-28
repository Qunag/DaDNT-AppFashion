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
 * Get multiple products with pagination and filtering
 * @param {Object} filter - Filter criteria (e.g., { brand: 'Nike' })
 * @param {Object} pagination - Pagination options (e.g., { page: 1, limit: 10, sortBy: 'created_at', order: 'desc' })
 * @returns {Promise<Object>}
 */
const getProducts = async (filter, pagination) => {
    const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc' } = pagination;

    const query = {};
    if (filter.brand) {
        query.brand = { $regex: new RegExp(filter.brand, 'i') };
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        results: products,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
    };
};

/**
 * Get a single product by ID
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
 * Search products by name (partial match) with pagination
 * @param {string} name - Product name to search
 * @param {Object} pagination - Pagination options (e.g., { page: 1, limit: 10 })
 * @returns {Promise<Object>}
 */
const searchProductsByName = async (name, pagination) => {
    const { page = 1, limit = 10 } = pagination;

    const query = { name: { $regex: new RegExp(name, 'i') } };
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

    if (!products.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No products found with this name');
    }

    return {
        results: products,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
    };
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
 * @returns {Promise<void>}
 */
const deleteProduct = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.deleteOne();
};

const updateProductQuantities = async (productId, purchaseUpdates) => {
    // Kiểm tra purchaseUpdates có rỗng không
    if (!purchaseUpdates || purchaseUpdates.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Purchase updates array cannot be empty.');
    }

    // Kiểm tra trùng lặp color_name và size trong purchaseUpdates
    const seen = new Set();
    for (const update of purchaseUpdates) {
        const { color_name, size, quantity } = update;

        // Kiểm tra quantity phải là số dương (vì đây là số lượng cần mua)
        if (quantity <= 0) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Quantity for color ${color_name} and size ${size} must be a positive number.`);
        }

        const key = `${color_name}:${size}`;
        if (seen.has(key)) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Duplicate update for color ${color_name} and size ${size}.`);
        }
        seen.add(key);
    }

    // Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
    const session = await Product.startSession();
    session.startTransaction();

    try {
        const product = await Product.findById(productId).session(session);
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, `Product with ID ${productId} not found`);
        }

        // Cập nhật số lượng (giảm số lượng tồn kho)
        purchaseUpdates.forEach(({ color_name, size, quantity }) => {
            const color = product.colors.find((c) => c.color_name === color_name);
            if (!color) {
                throw new ApiError(httpStatus.BAD_REQUEST, `Color ${color_name} not found in product`);
            }

            const sizeEntry = color.sizes.find((s) => s.size === size);
            if (!sizeEntry) {
                throw new ApiError(httpStatus.BAD_REQUEST, `Size ${size} not found in color ${color_name}`);
            }

            // Kiểm tra số lượng tồn kho có đủ để đáp ứng đơn hàng không
            if (sizeEntry.quantity < quantity) {
                throw new ApiError(httpStatus.BAD_REQUEST, `Insufficient quantity for size ${size} in color ${color_name}. Available: ${sizeEntry.quantity}, Requested: ${quantity}`);
            }

            // Giảm số lượng tồn kho
            sizeEntry.quantity -= quantity;
        });

        await product.save({ session });
        await session.commitTransaction();
        return product;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
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