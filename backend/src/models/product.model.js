const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const sizeSchema = new mongoose.Schema({
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
});

const colorSchema = new mongoose.Schema({
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
    sizes: [sizeSchema],
});

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
        colors: [colorSchema],
        discription: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
