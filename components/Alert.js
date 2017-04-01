import React, {Component} from 'react';



export default function Alert(props){
        let currentAlerts = [...props.currentAlerts];
            // currentAlerts.reverse();
        const currentUser = props.currentUser;

    let header;
        if (currentUser.role === 'admin'){
            header = <h3>Admin Outbox</h3>
            currentAlerts = [...props.allAlerts];
        }
            else header = <h3>Alert Inbox</h3>

    currentAlerts.reverse();
    let emptyInbox;

    if(currentAlerts.length === 0){
       // emptyInbox = <img className='inboxImage' src='/inbox.jpg'/>
        emptyInbox = <p>Your Inbox is currently empty</p>
    }


        return(
            <div>
                {header}
                {emptyInbox}

                { currentAlerts.map((alert) => {
                        return(
                            <div className="alert" key={alert.id}>
                                {/*<p>To: {alert.to}</p>*/}
                                {/*<p>From: {alert.from}</p>*/}
                                <p>Alert: {alert.body}</p>
                                <p>Deadline: {alert.deadline.due} </p>
                                <hr/>
                            </div>
                        )
                    }
                )}
            </div>
        )
}





