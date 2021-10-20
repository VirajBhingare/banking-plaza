import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import CustomerContext from '../context/customers/CustomerContext';
import Spinner from './Spinner';

const Transfer = () => {
    const [loading, setLoading] = useState(true)
    const context = useContext(CustomerContext);
    const { customers, getCustomers } = context;
    const params = useParams()
    const sender = params.sender
    const [selectedReceiver, setSelectedReceiver] = useState(null)
    const [amount, setAmount] = useState(0)
    const [tag, setTag] = useState("")
    let receiverName = null
    let senderName = null

    const transferFormStyle = {
        textAlign: "left"
    }

    const onChangeOfReceiver = async (e) => {
        setSelectedReceiver(e.target.value)
    }

    const onChangeOfAmount = async (e) => {
        setAmount(e.target.value)
    }

    const onChangeOfTag = async (e) => {
        setTag(e.target.value)
    }

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
            <div className="table-responsive container custom-container">
                <h1>Transfer</h1>
                <form style={transferFormStyle}>
                    <div className="mb-3">
                        <label htmlFor="sender" className="form-label my-3"><h4>Sender</h4></label>
                        <table className="table table-hover my-2 text-center" id="sender" name="sender">
                            <thead>
                                <tr>
                                    <th scope="col">Account No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Balance (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => {
                                    if (params.sender === customer._id) {
                                        senderName = customer.name
                                        return (
                                            <tr key={customer._id}>
                                                <th scope="row">{customer.account_number}</th>
                                                <td>{customer.name}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.balance}</td>
                                            </tr>
                                        )
                                    } else return null
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="receiver" className="form-label my-4"><h4>Receiver</h4></label>
                        <select className="form-select" id="receiver" name="receiver" onClick={onChangeOfReceiver} onChange={onChangeOfReceiver} >
                            {customers.map((customer) => {
                                if (params.sender === customer._id) {
                                    return null
                                } else {
                                    return (
                                        <option key={customer._id} value={`${customer._id}`}>{customer.name}</option>
                                    )
                                }
                            })}
                        </select>
                        <table className="table table-hover my-2 text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Account No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Balance (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => {
                                    if (customer._id === selectedReceiver) {
                                        receiverName = customer.name
                                        return (
                                            <tr key={customer._id}>
                                                <th scope="row">{customer.account_number}</th>
                                                <td>{customer.name}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.balance}</td>
                                            </tr>
                                        )
                                    } else return null
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-3">
                        <div className="row">
                            <div className="col-lg-6">
                                <label htmlFor="amount" className="form-label">Amount (₹)</label>
                                <input type="number" className="form-control" id="amount" name="amount" onChange={onChangeOfAmount} value={amount} />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="tag" name="tag" placeholder="Add a note" onChange={onChangeOfTag} value={tag} />
                            </div>
                        </div>
                    </div>

                    <Link to={`/transfer/${sender}/${selectedReceiver}/${amount}/${tag}/${senderName}/${receiverName}/success`}><button type="button" className="btn btn-primary">
                        Transfer
                    </button></Link>
                </form>
            </div>
        )
    }
}

export default Transfer