const mongoose = require('mongoose');



const brandSchema = new mongoose.Schema({

    name: { type: String, required: true },
    productsId: [{ type: mongoose.Types.ObjectId, ref: "products", required: true }]
})


module.exports = mongoose.model('brands', brandSchema);