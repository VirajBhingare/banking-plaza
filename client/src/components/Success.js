import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import CustomerContext from '../context/customers/CustomerContext';

const Success = () => {
    const context = useContext(CustomerContext);
    const { transferAmount } = context;
    const params = useParams()
    const history = useHistory()
    const [success, setSuccess] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)

    const goToPreviousPage = () => {
        history.goBack()
    }

    useEffect(() => {
        const response = transferAmount(params.sender, params.receiver, params.amount, params.tag)
        response.then((value) => {
            if (value.error) {
                setSuccess(false)
                setErrorMsg(value.error)
            } else {
                setSuccess(true)
            }
        })

        // eslint-disable-next-line
    }, [])

    if (success) {
        return (
            <div className="container">
                <div className="card text-center my-5">
                    <div className="card-header">
                        Transaction Successful !
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            Your amount has been safely transferred</h5>
                        <p className="card-text">{params.sname} has successfully transferred ₹ {params.amount} to {params.rname}.</p>
                        <Link to="/transactions" className="btn btn-primary">Go to Transaction History</Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="card text-center my-5">
                    <div className="card-header">
                        Transaction Unsuccessful !
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            {errorMsg}                        
                        </h5>
                        <p className="card-text">
                            Please try again !
                        </p>
                        <button type="button" className="btn btn-primary" onClick={goToPreviousPage}>Try Again</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Success
