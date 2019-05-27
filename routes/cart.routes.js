const router = require('express').Router();
const cors = require('cors');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');

router.use(cors());

// Get shopping cart by user id
router.get('/get_shopping_cart/:id', (req, res) => {

    Cart.findOne({idUser: req.params.id}, (err, cart) => { 
        if(err)
            console.log(err)
        else
            if(cart)
                return res.json(cart)
            else
                return res.status(400).send('Cart not founded')
    })

})

router.get('/', (req, res) => {
    Card.find((err, carts) => {
        if(err)
            console.log(err)
        else 
            if(carts)
                return res.json(carts)
            else 
                return res.status(400).send('Theres no carts')
    })
})

// Adding item to cart
router.post('/add_to_cart', (req, res) => {
    let { data, id } = req.body;

    Cart.findOneAndUpdate({idUser: id}, 
        {
            $push: {"products": data }
        },
        { safe: true, upsert: true },
        function (err, model) {
          if (err) {

            return res.send(err);
          }
          return res.json(model);
        });
});

router.post('/remove_items', (req, res) => {
    let { id } = req.body;

    Cart.update({idUser:id}, 
        { 
            $set: { products: [] }
        },
        function(err, affected){
            return res.json(affected);
        });
})

router.post('/remove_item', (req, res) => {
    let { idItem, idUser } = req.body;

    Cart.update({idUser:idUser}, 
        { 
            $pull: { products: { _id: idItem} }
        },
        function(err, affected){
            return res.json(affected);
        });
})




module.exports = router;