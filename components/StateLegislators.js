import React, {Component} from 'react';



export default function StateLegislator(props){
    // console.log("StateLegislator props --------------->", props);
    const addressDetails = props.addressDetails;
    let currentStateLegislators = [...props.addressDetails.stateLegislators];
    // currentStateLegislators.reverse();
    const currentUser = props.currentUser;

    // if(currentUser.role === 'admin'){
    //     currentStateLegislators = allStateLegislators
    // }

    return(
        <div className="clearfix">
            <h3 id='stateLegHeader'>My State Legislators</h3>
            { currentStateLegislators.map((stateLegislator) => {
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






