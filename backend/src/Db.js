const mongoose = require('mongoose')

const connect = () => {

    return mongoose.connect(`mongodb+srv://aashish:kumar123@cluster0.uktru5c.mongodb.net/products`)
}

module.exports = connect;