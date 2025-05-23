const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Add a new product
 * @param {Object} productData - Product data to create
 * @returns {Promise<Product>}
 */
const createNewProduct = async (productData) => {
    const existingProduct = await Product.findOne({ name: productData.name });
    if (existingProduct) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already exists');
    }
    return Product.create(productData);
};

/**
 * Get multiple products with filtering, pagination, and sorting
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Pagination and sorting options
 * @returns {Promise<Object>}
 */
const getProducts = async (filter = {}, options = {}) => {
    const {

        sortBy = 'createdAt',
        order = 'desc'
    } = options;
    const query = {};

    // Lọc theo thương hiệu (không phân biệt chữ hoa chữ thường)
    if (filter.brand) {
        query.brand = { $regex: new RegExp(filter.brand, 'i') };
    }

    // Lọc theo giá
    if (filter.minPrice || filter.maxPrice) {
        query.price = {};
        if (filter.minPrice) query.price.$gte = Number(filter.minPrice);
        if (filter.maxPrice) query.price.$lte = Number(filter.maxPrice);
    }

    // Lọc theo màu sắc (không phân biệt chữ hoa chữ thường)
    if (filter.color) {
        query['colors.color_name'] = { $regex: new RegExp(filter.color, 'i') };
    }

    // Lọc theo kích thước
    if (filter.size) {
        query['colors.sizes.size'] = Number(filter.size);
    }

    // Lọc theo tình trạng còn hàng (kiểm tra nếu số lượng > 0)
    if (filter.inStock) {
        query['colors.sizes.quantity'] = { $gt: 0 };
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .lean();

    return {
        results: products,
        totalResults: total,
    };
};


/**
 * Filter products by specific fields (brand, price, color, size, quantity)
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Pagination and sorting options
 * @returns {Promise<Object>}
 */
const filterProducts = async (filter = {}, options = {}) => {
    const {
        sortBy = 'createdAt',
        order = 'desc'
    } = options;
    const query = {};

    // Lọc theo thương hiệu (không phân biệt chữ hoa chữ thường)
    if (filter.brand) {
        query.brand = { $regex: new RegExp(filter.brand, 'i') };
    }

    // Lọc theo giá
    if (filter.minPrice || filter.maxPrice) {
        query.price = {};
        if (filter.minPrice) query.price.$gte = Number(filter.minPrice);
        if (filter.maxPrice) query.price.$lte = Number(filter.maxPrice);
    }

    // Lọc theo màu sắc (không phân biệt chữ hoa chữ thường)
    if (filter.color) {
        query['colors.color_name'] = { $regex: new RegExp(filter.color, 'i') };
    }

    // Lọc theo kích thước
    if (filter.size) {
        query['colors.sizes.size'] = Number(filter.size);
    }

    // Lọc theo tình trạng có hàng (quantity > 0)
    if (filter.hasQuantity) {
        query['colors.sizes.quantity'] = { $gt: 0 };
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .lean();

    return {
        results: products,
        totalResults: total,
    };
};


/**
 * Search products by name with pagination
 * @param {string} name - Product name to search
 * @param {Object} options - Pagination options
 * @param {boolean} exact - Whether to perform an exact search
 * @returns {Promise<Object>}
 */
const searchProductsByName = async (name, options = {}, exact = false) => {
    const { page = 1, limit = 10 } = options;

    if (!name || typeof name !== 'string' || !name.trim()) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required and must be a non-empty string');
    }

    const query = exact
        ? { name: name.trim() }
        : { name: { $regex: new RegExp(name.trim(), 'i') } };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
        .select('name brand price colors')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return {
        results: products,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
        totalResults: total,
    };
};

/**
 * Get a product by ID
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
 * Update product details
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
 * Delete a product
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

/**
 * Update product quantities
 * @param {string} productId - Product ID
 * @param {Array} updates - List of { color_name, size, quantity }
 * @returns {Promise<Product>}
 */
const updateProductQuantities = async (productId, updates) => {
    if (!updates || !Array.isArray(updates) || updates.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Updates must be a non-empty array');
    }

    const session = await Product.startSession();
    session.startTransaction();

    try {
        const product = await Product.findById(productId).session(session);
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        }

        for (const { color_name, size, quantity } of updates) {
            const color = product.colors.find((c) => c.color_name === color_name);
            if (!color) {
                throw new ApiError(httpStatus.BAD_REQUEST, `Color ${color_name} not found`);
            }

            const sizeEntry = color.sizes.find((s) => s.size === size);
            if (!sizeEntry) {
                throw new ApiError(httpStatus.BAD_REQUEST, `Size ${size} not found in color ${color_name}`);
            }

            // Cập nhật số lượng (cho phép tăng hoặc giảm)
            sizeEntry.quantity = quantity;
        }

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

const decreaseProductQuantities = async (productId, updates) => {
    const session = await Product.startSession();
    session.startTransaction();

    try {
        const product = await Product.findById(productId).session(session);
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        }

        for (const { color_name, size, quantity } of updates) {
            // Chuyển size sang kiểu number nếu cần
            const sizeToCheck = typeof size === 'string' ? parseInt(size, 10) : size;

            const color = product.colors.find((c) => c.color_name == color_name);
            if (!color) {
                throw new ApiError(httpStatus.BAD_REQUEST, `Color ${color_name} not found`);
            }

            // Tìm size trong mảng sizes của color
            const sizeEntry = color.sizes.find((s) => s.size === sizeToCheck);

            if (!sizeEntry) {
                throw new ApiError(httpStatus.BAD_REQUEST, `Size ${sizeToCheck} not found for color ${color_name}`);
            }

            if (sizeEntry.quantity < quantity) {
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    `Not enough stock for ${color_name}, size ${sizeToCheck}`
                );
            }

            // Giảm số lượng trong kho
            sizeEntry.quantity -= quantity;
        }

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



const increaseProductQuantity = async (productId, { color_name, size, quantity }) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    const color = product.colors.find((c) => c.color_name == color_name);
    if (!color) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Color ${color_name} not found`);
    }

    const sizeEntry = color.sizes.find((s) => s.size == size);
    if (!sizeEntry) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Size ${size} not found`);
    }

    sizeEntry.quantity += quantity;

    await product.save();
};




module.exports = {
    createNewProduct,
    getProducts,
    filterProducts,
    searchProductsByName,
    getProductById,
    updateProduct,
    deleteProduct,
    updateProductQuantities,
    decreaseProductQuantities,
    increaseProductQuantity,
};