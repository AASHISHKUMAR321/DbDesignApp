const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({

    name: { type: String, required: true },
    productsId: [{ type: mongoose.Types.ObjectId, ref: "prod", required: true }]
})

module.exports = mongoose.model('category', categoryModel)