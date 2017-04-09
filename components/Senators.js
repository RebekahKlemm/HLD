import React, {Component} from 'react';

import {Link} from 'react-router'

export default function Senators(props) {
    let senators = props.senators;

    return (
        <div>
            { senators.map((senator) => {
                    return (
                            <div key={senator}>
                                {senator}
                            </div>
                    )
                }
            )}
        </div>
    )
}