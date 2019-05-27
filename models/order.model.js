let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Order = new Schema({
    idUser: {
        type: String,
        required: true,
        ref: 'User'
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        quantity: {
            type: Number
        }
    }],
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', Order);