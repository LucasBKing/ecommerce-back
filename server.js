const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const providerRoutes = require('./routes/provider.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/orders.routes');

const PORT = process.env.PORT || 4200;

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

const uri = "mongodb+srv://lucasbking:44223820lu4422l@hodierno-dwjls.mongodb.net/test?retryWrites=true";

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use('/users', userRoutes);
app.use('/providers', providerRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT)
})
