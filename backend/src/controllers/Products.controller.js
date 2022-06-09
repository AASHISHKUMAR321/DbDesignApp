const express = require('express');


const productsModel = require('../models/Products.model')

const router = express.Router();


router.get('', async(req, res) => {

    try {

        const products = await productsModel.find().lean().exec();
        res.send(products);
    } catch (err) {
        console.log(err.message)
    }
})
router.get('/:id', async(req, res) => {
    try {
        const products = await productsModel.findOne(req.params._id).lean().exec();
        res.send(products);
    } catch (err) {
        console.log(err.message)
    }
})

router.post('/create', async(req, res) => {


    try {
        const products = await productsModel.create(req.body)
        res.send(products)
    } catch (err) {
        console.log(err.message)
    }
})
router.patch('/:id/edit', async(req, res) => {
    try {
        // console.log(req.params.id)
        const products = await productsModel.findByIdAndUpdate(req.params.id, { name: req.body.name, $push: { productsId: req.body.productsId } }, { new: true })
        res.send(products)

    } catch (err) {
        console.log(err.message)
    }
})

router.delete('/:id', async(req, res) => {

    try {
        console.log('delete')
        const products = await productsModel.findOneAndDelete(req.params._id)
        res.send(products)

    } catch (err) {
        console.log(err.message)
    }
})


module.exports = router;