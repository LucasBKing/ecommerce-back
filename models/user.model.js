let mongoose = require('mongoose');
let validator = require('validator');
let bcrypt = require('bcrypt');
const Cart = require('../models/cart.model');
let Schema = mongoose.Schema;

let User = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            return validator.isEmail(value);
        } 
    },
    user_type: {
        type: String,
        required: true
    },
    adress: [{
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        neighborhood: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        }
    }],
    password: {
        type: String,
        required: true
    },
    idCart: {
        type: String,
        ref: 'Cart'
    }
    
});

User.pre('save', function(next) {
    let user = this;

    if(!this.isNew) {
        next();
    }

    let cart = new Cart();
    cart.idUser = user._id;
    
    cart.save()
        .then(cart => {
            next();
        });
});

User.pre('save', function(next) {
    let user = this;
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
                    
        });
    });
});


module.exports = mongoose.model('User', User);