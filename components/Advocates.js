import React, {Component} from 'react';



export default function Advocates(props){
    // console.log("Advocate props --------------->", props);
    const addressDetails = props.addressDetails;
    let currentAdvocates = [...props.addressDetails.stateLegislators];
    // currentAdvocates.reverse();
    const currentUser = props.currentUser;

    return(
        <div className="clearfix">
            <h3 id='stateLegHeader'>Advocates</h3>
            { currentAdvocates.map((stateLegislator) => {
                    return(
                        <div className="stateLegislators col-sm-6" key={stateLegislator.id}>
                            <img src={stateLegislator.photo_url} className="img-thumbnail"/>
                            <h4>{ stateLegislator.full_name }</h4>
                            <p>{stateLegislator.party}</p>
                            <p>{stateLegislator.offices[0].phone}</p>
                            <p>{stateLegislator.offices[0].email}</p>
                        </div>
                    )
                }
            )}
        </div>
    )
}
