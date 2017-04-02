import React, {Component} from 'react';

export default function RepBuds(props) {
    let representative = props.representative;
    let advocates = props.advocates.allAdvocates;
    let currentAdvocate = props.currentAdvocate;
    let filteredAdvocates = advocates.filter((advocate) => advocate.id !== currentAdvocate.id && advocate.representative === representative);

    return (
        <div>
            { filteredAdvocates.map((advocate) => {
                    return (
                        <div key={advocate.id}>
                            {advocate.fullName} {advocate.checkedIn}
                        </div>
                    )
                }
            )}
        </div>
    )
}
