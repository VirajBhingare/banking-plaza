import React from 'react'
import tsfLogo from '../tsf-logo.png'

const About = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6">
                    <h1 className="my-4">Hi, I am Viraj Bhingare.</h1>
                    <h4>This project is a part of an internship for <br />The Sparks Foundation under the Graduate Rotational Internship Program (GRIP).</h4>
                    <div className="my-3">
                    <p>Task : Basic Banking System</p>
                    <p>Frontend : HTML | CSS | Javascript | Bootstrap | React.js</p>
                    <p>Backend : Node.js | Express.js</p>
                    <p>Database : MongoDB</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 my-3">
                            <h5>Github</h5>
                            <i className="fab fa-github fa-3x"></i>
                            <a className="social" href="https://github.com/VirajBhingare" target="_blank" rel="noreferrer"><p className="my-2">VirajBhingare</p></a>
                        </div>
                        <div className="col-lg-6 my-3">
                            <h5>LinkedIn</h5>
                            <i className="fab fa-linkedin fa-3x"></i>
                            <a className="social" href="https://www.linkedin.com/in/viraj-bhingare" target="_blank" rel="noreferrer"><p className="my-2">Viraj Bhingare</p> </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <img className="tsf-logo" src={tsfLogo} alt="logo" />
                </div>
            </div>
        </div>
    )
}

export default About
