import React, {Component} from 'react';

import {Link} from 'react-router'

export default function Representatives(props) {
    let representatives = props.representatives;

    return (
        <div>
            { representatives.map((representative) => {
                    return (
                            <div key={representative}>
                                {representative}
                            </div>
                    )
                }
            )}
        </div>
    )
}