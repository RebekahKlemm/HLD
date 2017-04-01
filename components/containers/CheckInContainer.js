import React, {Component} from 'react';
import StateLegislators from '../StateLegislators';
import { connect } from 'react-redux';

class CheckInContainer extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className='CheckInContainer'>
                <StateLegislators addressDetails={this.props.addressDetails} currentUser={this.props.currentUser}/>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        addressDetails: state.addressDetails,
        currentUser: state.users.currentUser
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}



export default connect(mapStateToProps, mapDispatchToProps)(CheckInContainer);
