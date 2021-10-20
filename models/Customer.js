const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
    account_number: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Customer', customerSchema)