import React, {Component} from 'react';
import { connect } from 'react-redux';
import Alert from './Alert';


export default function Inbox(props){
    // console.log("Inbox props --------------->", props);
    const allAlerts = props.allAlerts;
    const currentAlerts = props.currentAlerts;
    const currentUser = props.currentUser;


    return(
        <div>

                <Alert allAlerts={allAlerts} currentAlerts={currentAlerts} currentUser={currentUser}/>

        </div>
    )
}


