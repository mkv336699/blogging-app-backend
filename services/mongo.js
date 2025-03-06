const mongoose = require('mongoose');

const mongooseConnection = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/blogging-app")
}

module.exports = {
    mongooseConnection
}