import React, { Component } from 'react';


export default function(props) {
    return (
        <div>
            <form id="delete-user-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => props.deleteUser(e)}>
                <button id="deleteUser-submit" type="submit" form="delete-user-form" value="Submit"
                        className="btn btn-primary btn-block" >
                    <span className="glyphicon glyphicon-plus"></span> Delete Account
                </button>
                <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
            </form>
        </div>
    )
}


