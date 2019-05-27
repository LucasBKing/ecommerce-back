const router = require('express').Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Cart = require('../models/product.model');
process.env.SECRET_KEY = 'secret'

router.use(cors());

// Getting all users
router.get('/', (req, res) => {
    User.find((err, users) => {
        if(err)
            console.log(err);
        else 
            res.json(users)
    })
});

router.get('/providers', (req, res) => {
    User.find({user_type: 'provider'}, (err, providers) => {
        if(err)
            console.log(err)
        else 
            if(!providers)
                res.status(404).send('Providers not found')
            else
                res.status(200).json(providers);
    })
});

// Getting a specific user
router.get('/account/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(!user) {
            res.status(404).send('User not found');
        } else {
            res.json(user);
        }
    })
})

router.post('/account', (req, res) => {
    let { account, id } = req.body;

    User.findById(id, (err, user) => {
        if(!user)
            res.status(404).send('User not found');
        else {
            user.first_name = account.first_name;
            user.last_name = account.last_name;
            user.email = account.email;
            user.state = account.state;
            user.city = account.city;
            user.street = account.street;
            user.neighborhood = account.neighborhood;
            user.number = account.number;

            user.save()
                .then(user => {
                    let token = jwt.sign({user: user}, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    return res.send(token); 
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                })
        }
    
    })
});

//Creating a user
router.post('/create', (req, res) => {
    let { account } = req.body;

    let user = new User(account);
    
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user created successfully'});
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Creating new user failed');
        })
});

// Sign In user
router.get('/signin', (req, res) => {
    let { account } = req.query;

    let params = JSON.parse(account);
    
    let { email, password, user_type } = params;
    // fetch user and test password verification
    User.findOne({email}, (err, user) => {
        if (err) throw err;
          if(user) {
            // test a matching password
            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) throw err;
                else 
                    if(isMatch) {
                        if(user.user_type === user_type) {
                            let token = jwt.sign({user: user}, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            
                            return res.send(token);    
                        } else {
                            res.status(400).send('Incorret type of user')
                        }                     

                    }
                        
                    else
                        res.status(400).send('Incorret password')            
            });

        } else 
            res.status(400).send('User not founded')
        
    });
})

module.exports = router;