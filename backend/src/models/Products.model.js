const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Types.ObjectId, ref: "category", required: true },



})


module.exports = mongoose.model('prod', productSchema)