import React, { Component } from 'react';
import InterestOptions from './InterestOptions';


export default function(props) {
    return (
        <div>
            <h3>Edit your profile </h3>
            <form id="edit-profile-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => props.editUser(e)}>
                <input
                    id="first-name-input"
                    name="first"
                    className="form-control"
                    placeholder="Enter first name"
                    onChange={e => props.handleInputChange(e)}
                    value={props.first}
                />
                <input
                    id="last-name-input"
                    name="last"
                    className="form-control"
                    placeholder="Enter last name"
                    onChange={e => props.handleInputChange(e)}
                    value={props.last}
                />
                <input
                    id="address-input"
                    name="address"
                    className="form-control"
                    placeholder="Enter address"
                    onChange={e => props.handleInputChange(e)}
                    value={props.address}
                />
                <input
                    id="password-input"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={e => props.handleInputChange(e)}
                    value={props.password}
                />
                <br></br>
                <h4>Subscribe to alerts on the following topics:</h4>
                <InterestOptions allInterests={props.allInterests} interests={props.interests} handleInputChange={props.handleInputChange}/>
                <br></br>
                <button id="editUser-submit" type="submit" form="edit-profile-form" value="Submit"
                        className="btn btn-primary btn-block" >
                    <span className="glyphicon glyphicon-plus"></span> Confirm Changes
                </button>
                <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
            </form>
        </div>
    )
}


