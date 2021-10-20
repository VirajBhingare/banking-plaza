const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction')
const Customer = require('../models/Customer')

// ROUTE : 1
// Transfer Money
// POST : "/api/transfer"
router.post('/', [
    body('amount', 'The amount must be a numeric value').isNumeric(),
], async (req, res) => {
    try {
        const { sender, receiver, amount, tag } = req.body

        // If there are validation errors, then return Bad Request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Find the Sender & Receiver in DB
        let senderCustomer = await Customer.findOne({ _id: sender })
        let receiverCustomer = await Customer.findOne({ _id: receiver })
        
        // Return error if sender's balance is insufficient
        if (senderCustomer.balance < amount) {
            return res.status(400).json({ error: "The sender has insufficient balance to transfer the given amount" });
        }

        // Return error if amount is zero
        if (amount === 0 || amount === "0") {
            return res.status(400).json({ error: "No need to transfer if the amount is zero" });
        }
        
        // Return error if amount is zero
        if (amount < 0) {
            return res.status(400).json({ error: "The amount cannot be negative" });
        }

        // Continue transaction only if sender and receiver are not same
        if (senderCustomer.account_number !== receiverCustomer.account_number) {
            const generateTransactionID = (length) => {
                var result = ''
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                var charactersLength = characters.length
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength))
                }
                return result
            }

            senderCustomer.balance = Number(senderCustomer.balance) - Number(amount)
            receiverCustomer.balance = Number(receiverCustomer.balance) + Number(amount)
            senderCustomer.save()
            receiverCustomer.save()

            const transaction = await Transaction({
                transaction_id: generateTransactionID(18),
                sender: senderCustomer,
                receiver: receiverCustomer,
                amount, tag
            })

            const savedTransaction = await transaction.save()
            res.json(savedTransaction)

        } else {
            return res.status(400).json({ error: "The sender and receiver cannot be the same" });
        }

    } catch (error) {
        // Catch internal server error if any
        console.error(error.message);
        res.status(500).send("Something went wrong with the internal server.")
    }
})

// ROUTE : 2
// View Transactions
// GET : "/api/transfer/transactions"
router.get('/transactions', async (req, res) => {
    try {
        // Fetch all the transactions stored in DB
        const allTransactions = await Transaction.find({})
        res.send(allTransactions)
        
    } catch (error) {
        // Catch internal server error if any
        console.error(error.message);
        res.status(500).send("Something went wrong with the internal server.")
    }
})

module.exports = router