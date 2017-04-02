import React, {Component} from 'react';

import {Link} from 'react-router'

export default function Advocates(props) {
    let advocates = props.advocates;

    return (
        <div>
            { advocates.map((advocate) => {
                    return (
                        <Link to={`checkin/${advocate.id}`} className="center" key={advocate.id}>
                            <div className="hover largeFont" >
                                {advocate.fullName}
                            </div>
                        </Link>
                    )
                }
            )}
        </div>
    )
}