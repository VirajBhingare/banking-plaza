import React, { useContext, useEffect, useState } from 'react'
import CustomerContext from '../context/customers/CustomerContext';
import Spinner from './Spinner';

const Transactions = () => {
    const context = useContext(CustomerContext);
    const { transactions, getTransactions } = context;
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getTransactions().then(() => {
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className="container custom-container table-responsive">
                <h1 className="my-3">Transaction History</h1>
                <table className="table table-hover my-4">
                    <thead>
                        <tr>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Sender</th>
                            <th scope="col">Receiver</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Tag</th>
                            <th scope="col">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => {
                            return (
                                <tr key={transaction._id}>
                                    <th scope="row">{transaction.transaction_id}</th>
                                    <td>{transaction.sender.name}</td>
                                    <td>{transaction.receiver.name}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.tag}</td>
                                    <td>{new Date(transaction.date).toLocaleString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Transactions
