let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Product = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    onSale: {
        type: Boolean,
        required: true
    },
    idProvider : {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Product', Product);