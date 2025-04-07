// cart.model.js
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const cartItemSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        color: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const cartSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        items: [cartItemSchema],
    },
    {
        timestamps: true,
    }
);

cartSchema.plugin(toJSON);
cartSchema.plugin(paginate);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
