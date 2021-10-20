import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomerContext from '../context/customers/CustomerContext'
import Spinner from './Spinner';

const Customers = () => {
    const context = useContext(CustomerContext);
    const { customers, getCustomers } = context;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCustomers().then(() => {
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className="container custom-container table-responsive">
                <h1 className="my-3">View & Transact</h1>
                <table className="table table-hover my-4">
                    <thead>
                        <tr>
                            <th scope="col">Account No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Balance (₹)</th>
                            <th scope="col">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => {
                            return (
                                <tr key={customer._id}>
                                    <th scope="row">{customer.account_number}</th>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.balance}</td>
                                    <td><Link to={`/transfer/${customer._id}`}><button type="button" className="btn btn-primary btn-sm" id={`${customer._id}`}>Transact</button></Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Customers
