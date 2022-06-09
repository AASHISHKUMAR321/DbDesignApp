const express = require('express');
const brandMode = require('../models/brand.mode');

const router = express.Router();
const BrandModel = require('../models/brand.mode');


router.get('', async(req, res) => {

    try {
        const brand = await BrandModel.find().lean().exec();
        res.send(brand);
    } catch (err) {
        console.log(err.message)
    }
})
router.get('/:id', async(req, res) => {
    try {       
        const brand = await BrandModel.findOne(req.params._id).lean().exec();
        res.send(brand);
    } catch (err) {
        console.log(err.message)
    }
})

router.post('/create', async(req, res) => {


    try {
        const brand = await BrandModel.create(req.body)
        res.send(brand)
    } catch (err) {
        console.log(err.message)
    }
})
router.patch('/:id/edit', async(req, res) => {
    try {
        // console.log(req.params.id)
        const brand = await BrandModel.findByIdAndUpdate(req.params.id, { name: req.body.name, $push: { productsId: req.body.productsId } }, { new: true })
        res.send(brand)

    } catch (err) {
        console.log(err.message)
    }
})

router.delete('/:id', async(req, res) => {

    try {
        console.log('delete')
        const brand = await brandMode.findOneAndDelete(req.params._id)
        res.send(brand)

    } catch (err) {
        console.log(err.message)
    }
})


module.exports = router;