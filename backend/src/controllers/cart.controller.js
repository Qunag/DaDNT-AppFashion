const catchAsync = require('../utils/catchAsync')
const cartService = require('../services/cart.service')
const httpStatus = require('http-status')


// Create a new cart with auth
const createCart = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const cartBody = req.body;
    const cart = await cartService.createCart(cartBody, userId);
    res.status(httpStatus.CREATED).json(cart);
});

// Get cart info
const getCart = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const cart = await cartService.getCartByUserID(userId);
    res.status(200).json(cart);
});

// Update cart
const updateCart = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const cartBody = req.body;
    const cart = await cartService.updateCart(userId, cartBody);
    res.status(200).json(cart);
}
);

// Delete cart
const deleteCart = catchAsync(async (req, res) => {
    const userId = req.user.id;
    await cartService.deleteCart(userId);
    res.status(204).send();
}
);

//Delete cart item 
const deleteCartItem = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    await cartService.deleteCartItem(userId, productId);
    res.status(204).send();
}
);


const getCartItem = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    const cartItem = await cartService.getCartItem(userId, productId);
    res.status(httpStatus.OK).json(cartItem);
});


const updateCartItem = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    const cartItemData = req.body;
    const updatedCartItem = await cartService.updateCartItem(userId, productId, cartItemData);
    res.status(httpStatus.OK).json(updatedCartItem);
});

const validateCartItem = catchAsync(async (req, res) => {
    const { userId, productId } = req.params;
    const isValid = await cartService.validateCartItem(userId, productId);
    res.status(httpStatus.OK).json({ isValid });
}
);


module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart,
    deleteCartItem,
    getCartItem,
    updateCartItem,
    validateCartItem
};




