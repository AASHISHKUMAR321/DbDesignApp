const express = require('express');


const userModel = require('../models/User.model')

const router = express.Router();


router.get('', async(req, res) => {

    const user = await userModel.find().lean().exec();

    res.send(user)

    try {

    } catch (err) {
        console.log(err.message)
    }
})

router.post('/create', async(req, res) => {

    console.log(req.body)
    try {
        const user = await userModel.create(req.body)
        res.send(user)
    } catch (err) {
        console.log(err.message)
    }
})
router.patch('/:id/edit', async(req, res) => {
    try {
        // console.log(req.params.id)
        const user = await userModel.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email, $push: { address: req.body.address } }, { new: true })


        res.send(user)

    } catch (err) {
        console.log(err.message)
    }
})

router.delete('/:id', async(req, res) => {

    try {
        const user = await userModel.findOneAndDelete(req.body.id)
        res.send(user)

    } catch (err) {
        console.log(err.message)
    }
})


router.get('/:id/addresses', async(req, res) => {

    // console.log(req.params)
    try {
        const user = await userModel.findOne({ _id: req.params.id })
            // console.log(user)
        res.send(user.address)
    } catch (err) {
        console.log(err.message)
    }
})

router.post('/:id/addresses/create', async(req, res) => {


    try {
        const user = await userModel.findOneAndUpdate({ _id: req.params.id }, { $push: { address: req.body } }, { new: true })

        console.log(user)
        res.send(user)
    } catch (err) {
        console.log(err.message)
    }
})

router.patch('/:id/addresses/:idx/edit', async(req, res) => {


    try {

        const user = await userModel.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                [`address.${req.params.idx}`]: req.body
            }
        }, { new: true })



        res.send(user)
    } catch (err) {
        console.log(err.message)
    }
})



module.exports = router