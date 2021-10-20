import React, { useContext, useState } from 'react'
import CustomerContext from '../context/customers/CustomerContext';

const CreateCustomer = () => {
    const context = useContext(CustomerContext);
    const { createCustomer } = context;
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [alert, setAlert] = useState(false)

    const onChangeOfName = (e) => {
        setName(e.target.value)
    }

    const onChangeOfEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleCustomerSubmit = () => {
        createCustomer(name, email).then(() => {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 2000);
        })
    }

    const formStyle = {
        textAlign: "left"
    }

    return (
        <div style={formStyle} className="container custom-container">
            {alert && <div className="alert alert-success" role="alert">
                The customer was successfully created.
            </div>}
            <h1 className="my-3">Create Customer</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="cname" className="form-label">Name</label>
                    <input onChange={onChangeOfName} type="text" className="form-control" id="cname" name="cname" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cemail" className="form-label">Email address</label>
                    <input onChange={onChangeOfEmail} type="email" className="form-control" id="cemail" name="cemail" />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleCustomerSubmit}>Create</button>
            </form>
        </div>
    )
}

export default CreateCustomer
