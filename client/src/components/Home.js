import React from 'react'
import bankImage from '../bank.png'
import Card from './Card'

const Home = () => {
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-6">
                    <h1 className="my-4">Meet a convenient banking system - Banking Plaza</h1>
                    <h4>Handle all your banking transactions on the go</h4>
                    <div className="row">
                        <Card title="View Customers & Transact" description="Get all the customer details & transfer money to any other account with ease." icon="fa-users" redirect="/customers" />
                        <Card title="Transactions" description="View all the transactions taken place along with all the details and purpose of transaction in one go - Transaction History" icon="fa-money-check" redirect="/transactions" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <img className="bank-img" src={bankImage} alt="Banking Plaza" />
                </div>
            </div>
        </div>
    )
}

export default Home
