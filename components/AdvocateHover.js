import React, {Component} from 'react';

export default function AdvocateHover(props) {
    let advocates = props.advocates;

    return (
        <div>
            <ul className="noBullets">
            { advocates.map((advocate) => {
                    return (
                        <li key={advocate} className="left">{advocate}</li>
                    )
                }
            )}
            </ul>
        </div>
    )
}