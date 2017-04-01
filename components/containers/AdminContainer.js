import React, {Component} from 'react';
import UserDisplay from './UserDisplay';
import NewAlertContainer from './NewAlertContainer';
import NewAdminContainer from './NewAdminContainer';


// import Inbox from '../Inbox';
import { connect } from 'react-redux';

class AdminContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <NewAlertContainer/>
                    </div>
                    <div className="col-sm-6">
                        <NewAdminContainer/>
                    </div>
                </div>
                <div className="row">
                    <UserDisplay/>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        // allAlerts: state.alerts.allAlerts,
        // currentAlerts: state.alerts.currentAlerts,
        // currentUser: state.users.currentUser
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}



export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);

