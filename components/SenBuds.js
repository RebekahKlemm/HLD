import React, {Component} from 'react';

export default function SenBuds(props) {
    let senator = props.senator;
    let advocates = props.advocates.allAdvocates;
    let currentAdvocate = props.currentAdvocate;
    let filteredAdvocates = advocates.filter((advocate) => advocate.id !== currentAdvocate.id && advocate.senator === senator);

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
