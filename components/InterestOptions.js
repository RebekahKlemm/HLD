import React, {Component} from 'react';

export default function(props) {
    let allInterests = [...props.allInterests];

    return(
        <div>
            { allInterests.map((interest) => {
                    return(
                        <label className="checkbox-inline" key={interest.category}>
                            <input name='interests' type="checkbox" value={interest.category} onChange={e => props.handleInputChange(e)}/>{interest.category}
                        </label>
                    )
                }
            )}
        </div>
    )
}


    {
//
// {% for interest in InterestOptions %}
// <label class="checkbox-inline"><input type="checkbox" value="">{{interest.interestName}}</label>
// {% endfor %}
//
//
// <form id="new-signup-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => props.signUpUser(e)}>
//     <input
//         id="first-name-input"
//         name="first"
//         className="form-control"
//         placeholder="Enter first name"
//         onChange={e => props.handleInputChange(e)}
//         value={props.first}
//     />
//     <button id="signup-submit" type="submit" form="new-signup-form" value="Submit"
//             className="btn btn-primary btn-block">
//         <span className="glyphicon glyphicon-plus"></span> SUBMIT
//     </button>
//     <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
// </form>
    }