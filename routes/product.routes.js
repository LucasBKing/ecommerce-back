const router = require('express').Router();
const cors = require('cors');
const Product = require('../models/product.model');

router.use(cors());

// Get product by  id
router.get('/:id', (req, res) => {

    Product.findOne({_id: req.params.id}, (err, product) => { 
        if(err)
            console.log(err)
        else
            if(product)
                return res.json(product)
            else
                return rel.status(400).send('Product not founded')
    })

})

router.get('/', (req, res) => {

    Product.find({onSale: false}, (err, products) => { 
        if(err)
            console.log(err)
        else
            if(products)
                return res.json(products)
            else
                return rel.status(400).send('Products not founded')
    })
})

module.exports = router;