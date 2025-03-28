
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: 'Price must be an integer.',
            },
        },
        colors: [
            {
                color_name: {
                    type: String,
                    required: true,
                    trim: true,
                },
                image_url: {
                    type: String,
                    required: true,
                    trim: true,
                },
                sizes: [
                    {
                        size: {
                            type: Number,
                            required: true,
                            min: 0,
                            validate: {
                                validator: Number.isInteger,
                                message: 'Size must be an integer.',
                            },
                        },
                        quantity: {
                            type: Number,
                            required: true,
                            min: 0,
                            default: 0,
                            validate: {
                                validator: Number.isInteger,
                                message: 'Quantity must be an integer.',
                            },
                        },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;