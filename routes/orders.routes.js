const router = require('express').Router();
const cors = require('cors');
const Order = require('../models/order.model');

router.use(cors());

router.post('/add_order', (req, res) => {
    let { data } = req.body;

    let order = new Order(data);

    order.save()
        .then(order => {
            res.status(200).json({'Order': 'Order created successfully'});
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Creating new order failed');
        })
})

router.get('/', (req, res) => {
    Order.find({}, (err, orders) => {
        if(err)
            console.log(err)
        else
            if(orders)
                return res.json(orders)
            else
                return rel.status(400).send('Orders not founded')
    })
})
module.exports = router;