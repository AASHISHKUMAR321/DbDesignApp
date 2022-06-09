const express = require('express')
const userController = require('./controllers/user.controller')
const connect = require('./Db')
const BrandController = require('./controllers/brand.controller')
const ProductsController = require('./controllers/Products.controller')
const CategoryController = require('./controllers/category.controller')

const app = express();
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use('/user', userController)
app.use('/brands', BrandController)
app.use('/products', ProductsController)
app.use('/categories', CategoryController)




app.listen(3434, (req, res) => {
    connect();
    console.log('server started')
})