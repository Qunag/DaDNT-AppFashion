const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        sizes: {
            type: [Number],
            required: true,
            validate: {
                validator: (v) => v.length > 0,
                message: 'Sizes array cannot be empty',
            },
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
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
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