const router = require('express').Router();
const cors = require('cors');
const Product = require('../models/product.model');
const User = require('../models/user.model');

router.use(cors());

// Getting all products
router.get('/', (req, res) => {
    Product.find((err, products) => {
        if(err)
            console.log(err);
        else 
            res.json(products)
    })
});

//Creating a product
router.post('/add', (req, res) => {
    let { item } = req.body;

    let product = new Product(item);
    
    product.save()
        .then(product => {
            res.status(200).json({'Product': 'Product created successfully'});
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Creating new product failed');
        })
});

router.get('/:name', (req, res) => {
    
    User.findOne({first_name: req.params.name }, (err, user) => {
        if(!user)
            return res.status(404).send('User is not found');
        if(err)
            console.log(err)
        else 
            return res.json(user)
    })
})

// Get product by provider id
router.get('/get_product_by_provider_id/:id', (req, res) => {

    Product.find({idProvider: req.params.id}, (err, products) => { 
        if(err)
            console.log(err)
        else
            if(products)
                return res.json(products)
            else
                return rel.status(400).send('Products from this provider not founded')
    })

})

module.exports = router;