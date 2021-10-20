const mongoose = require('mongoose')
const { Schema } = mongoose
const customerSchema = require('./Customer').schema

const transactionSchema = new Schema({
    transaction_id: {
      type: String,
      required: true,
      unique: true 
    },
    sender: {
        type: customerSchema,
        required: true
    },
    receiver: {
        type: customerSchema,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    tag: {
       type: String,
       default: "General" 
    },
    date: {
        type: Date,
        default: Date.now 
    },
})

module.exports = mongoose.model('Transaction', transactionSchema)