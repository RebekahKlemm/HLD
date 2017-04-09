import React from 'react';
import {Link} from 'react-router'


export default function Nav() {
    return (
        <nav className="navbar navbar-inverse blue">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">Humane Lobby Day</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><Link to='/signup'>Signup <span className="sr-only">(current)</span></Link></li>
                        <li><Link to="/checkin">Check In</Link></li>
                        <li><Link to="/coverage">Coverage</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                    </ul>
                </div>
            </div>
        </nav>
    )
}



