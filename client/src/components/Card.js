import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {
    return (
        <div className="col-lg-6">
            <div className="card my-4">
                <i className={`my-2 fas ${props.icon} fa-5x`}></i>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <Link to={`${props.redirect}`} className="btn btn-primary">{props.title}</Link>
                </div>
            </div>
        </div>
    )
}

export default Card
