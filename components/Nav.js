import React from 'react';
import {Link} from 'react-router'


export default function Nav() {
    return (
            <nav className="navbar navbar-inverse blue">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Animal Alerts</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link href='#'>Signup <span className="sr-only">(current)</span></Link></li>
                            <li><a href="#/login">Login</a></li>
                            <li><a href="/api/users/logout">Logout</a></li>
                            <li><a href="#/checkin">Check In</a></li>
                            {/*<li><a href="#/user/123">User123(Joe)</a></li>*/}
                            {/*<li><a href="#/user/456">User456(Bill)</a></li>*/}
                            {/*<li><a href="#/admin/789">Admin789(Susie)</a></li>*/}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {/*<li><a href="#">Link</a></li>*/}
                        </ul>
                    </div>d
                </div>
            </nav>
    )
}



