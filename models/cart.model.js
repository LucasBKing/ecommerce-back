let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Cart = new Schema({
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
    }]
});

module.exports = mongoose.model('Cart', Cart);