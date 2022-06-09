const express = require('express');


const categoryModel = require('../models/Category.model')

const router = express.Router();


router.get('', async(req, res) => {

    try {
        console.log('cat')
        const category = await categoryModel.find().lean().exec();
        console.log(category)
        res.send(category);
    } catch (err) {
        console.log(err.message)
    }
})
router.get('/:id', async(req, res) => {
    try {
        const category = await categoryModel.findOne(req.params._id).lean().exec();
        res.send(category);
    } catch (err) {
        console.log(err.message)
    }
})

router.post('/create', async(req, res) => {


    try {
        const category = await categoryModel.create(req.body)
        console.log(category)
        res.send(category)
    } catch (err) {
        console.log(err.message)
    }
})
router.patch('/:id/edit', async(req, res) => {
    try {
        console.log(req.params.id)
        const category = await categoryModel.findByIdAndUpdate(req.params.id, { name: req.body.name, $push: { productsId: req.body.productsId } }, { new: true })
        console.log(category)
        res.send(category)

    } catch (err) {
        console.log(err.message)
    }
})

router.delete('/:id', async(req, res) => {

    try {
        console.log('delete')
        const category = await categoryModel.findOneAndDelete(req.params._id)
        res.send(category)

    } catch (err) {
        console.log(err.message)
    }
})


module.exports = router;