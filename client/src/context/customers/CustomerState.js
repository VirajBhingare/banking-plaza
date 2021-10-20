import { useState } from 'react'
import CustomerContext from './CustomerContext'
import React from 'react'

const CustomerState = (props) => {
    const initalCustomers = []
    const [customers, setCustomers] = useState(initalCustomers)

    const initalTransactions = []
    const [transactions, setTransactions] = useState(initalTransactions)

    // Create Customer
    const createCustomer = async (name, email) => {
        // API Call
        const response = await fetch('/api/customers/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email})
        });
        const json = await response.json()
        setCustomers(json)
    }

    // Get All Customers
    const getCustomers = async () => {
        // API Call
        const response = await fetch('/api/customers/view', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json()
        setCustomers(json)
    }

    // Get All Transactions
    const getTransactions = async () => {
        // API Call
        const response = await fetch('/api/transfer/transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json()
        setTransactions(json)
    }

    // Transfer Amount
    const transferAmount = async (sender, receiver, amount, tag) => {
        // API Call
        const response = await fetch('/api/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({sender, receiver, amount, tag})
        });
        const json = await response.json()
        setCustomers(json)
        return json
    }

    return (
        <div>
            <CustomerContext.Provider value={{createCustomer, customers, getCustomers, transactions, getTransactions, transferAmount}}>
                {props.children}
            </CustomerContext.Provider>
        </div>
    )
}

export default CustomerState
