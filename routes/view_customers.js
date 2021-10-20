const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer')

// ROUTE : 1
// Create Customer
// POST : "/api/customers/create"
router.post('/create', [
    body('name', "Name must be atleast three characters").isLength({ min: 3 }),
    body('email', "Enter a valid email id").isEmail(),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Generates a an account number for the customer
        const generateAccountNumber = (length) => {
            var result = ''
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            var charactersLength = characters.length
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength))
            }
            return result
        }

        const generateBalance = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            const generatedBalance = Math.floor(Math.random() * (max - min + 1)) + min
            return generatedBalance
        }

        const customer = await Customer({
            account_number: generateAccountNumber(15),
            name: req.body.name,
            email: req.body.email,
            balance: generateBalance(100000, 1000),
        })

        customer.save()
        res.send(customer)

    } catch (error) {
        // Catch internal server error if any
        console.error(error.message);
        res.status(500).send("Something went wrong with the internal server.")
    }
})

// ROUTE : 2
// View Customer
// GET : "/api/customers/view"
router.get('/view', async (req, res) => {
    try {
        // Fetch all the customers stored in DB
        const allCustomers = await Customer.find({})
        res.send(allCustomers)
        
    } catch (error) {
        // Catch internal server error if any
        console.error(error.message);
        res.status(500).send("Something went wrong with the internal server.")
    }
})

module.exports = router