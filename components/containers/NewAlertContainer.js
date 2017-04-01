import React, {Component} from 'react';
import { connect } from 'react-redux';
import NewAlert from '../NewAlert';
import {addAToDb, updateCurrentAlerts} from '../../actions/alerts'
// import {changeView} from '../../actions/view';

class NewAlertContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            to: '',
            interests: [],
            from: '',
            body: '',
            deadline: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addAlert = this.addAlert.bind(this);
    }

    handleInputChange(e){
        //handle interest check boxes
        if(e.target.name === 'interests'){
            //check to see if the interest is already in the array
            if(this.state.interests.length > 0){
                function matches(element){
                    return element === e.target.value;
                }
                const index = this.state.interests.findIndex(matches);

                //if the interest is in the array, remove it and update the State
                if (index >= 0 ){
                    const newState = this.state.interests.slice(0, index).concat(this.state.interests.slice(index+1))
                    this.setState({interests: [...newState]});
                }

                //if the interest is not in the array, add it to the State
                else{
                    this.setState({interests: [...this.state.interests, e.target.value] })
                }
            }

            //if there is nothing in the State interest array yet, add this interest
            else {
                this.setState({interests: [...this.state.interests, e.target.value] })
            }
        }

        //handle the normal input fields
        else{
            this.setState({[e.target.name]:e.target.value});
        }
    }

    render(){
        // console.log('***********allInterests', this.props.allInterests)
        return (<NewAlert allInterests={this.props.allInterests} handleInputChange={this.handleInputChange} addAlert={this.addAlert} {...this.state}/>)
    }

    addAlert(e){
        e.preventDefault();
        const alert = {
            // to: e.target.to.value,
            // to: this.state.interests,
            // from: this.props.currentUser.fullName,
            body: e.target.body.value
        }
        console.log('inside addAlert in NewAlertContainer, here is this.state.deadline', this.state.deadline)
        this.props.addAToDb(alert, this.state.interests, this.state.deadline);
        this.setState({
            to: '',
            from: '',
            body: '',
            interests: [],
            deadline: ''
        })

    }

}


const mapStateToProps = (state, ownProps) => {
    // console.log('*************state', state)
    return {
        currentUser: state.users.currentUser,
        allInterests: state.interests.allInterests
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addAToDb: function(alert, interests, due){
            dispatch(addAToDb(alert, interests, due));
        },
        updateCurrentAlerts: function(alert){
            dispatch(updateCurrentAlerts(alert));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAlertContainer);


