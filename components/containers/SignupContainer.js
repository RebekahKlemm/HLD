import React, {Component} from 'react';
import { connect } from 'react-redux';

import Signup from '../Signup';
import {addUser, addUToDb} from '../../actions/users'
import {changeView} from '../../actions/view';
import {addLatLongToDb, validateAddress} from '../../actions/addressDetails'

class SignupContainer extends Component{
    constructor(props){
        super(props)

        this.state = {
            first: '',
            last: '',
            address: '',
            phone: '',
            password: '',
            interests: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.signUpUser = this.signUpUser.bind(this);

    }

    handleAddress(e){
        //Ugh, I could not figure out how to validate the address and alert the user if they enter an invalid address!!

        // var latLong;
        // console.log('inside signup container, handleAddress, here is e', e.target.value)
        //
        // Promise.all([this.props.validateAddress(e.target.value)])
        //     .then(function(validation){
        //         console.log('inside handleAddress, here is validation', validation);
        //     })
        // if (this.props.validateAddress(e.target.value) !== 'valid'){
        //     console.log('here is this.props.validateAddress', )
            // alert('Please enter a valid U.S. address');
        // }
        // var googleMapsClient = require('@google/maps').createClient({
        //     key: 'AIzaSyBFetAhXRcymhUCT9_2_k-nEs8TEkDiOo8'
        // });
        // const OpenStates = require('openstates');
        // var openstates = new OpenStates('abc');
        //
        // googleMapsClient.geocode({
        //     address: e.target.value
        // }, function(err, response) {
        //     if (err) {
        //         alert('Please enter a valid U.S. address')
        //         // throw new Error('Please enter a valid U.S. address')
        //     }
        //     else{
        //         latLong = response.json.results[0].geometry.location
        //     }
        // });
        //
        // openstates.geoLookup(latLong.lat, latLong.lng, function(err, json) {
        //     alert('Please enter a valid U.S. address')
        //     // throw new Error('Please enter a valid U.S. address')
        // });

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
        return (<Signup allInterests={this.props.allInterests} handleInputChange={this.handleInputChange} signUpUser={this.signUpUser} {...this.state} handleAddress={this.handleAddress}/>)
    }

    signUpUser(e){
        e.preventDefault();
        // console.log('...........this.state.interests', this.state.interests)
        const user = {
            first: e.target.first.value,
            last: e.target.last.value,
            address: e.target.address.value,
            phone: e.target.phone.value,
            password: e.target.password.value,
            interests: this.state.interests
        }



        Promise.all([
            this.props.addUToDb(user),
            this.props.addLatLongToDb(user)
        ]).then(() => {
            // this.props.router.push('user/'+ user.phone);
            // window.location.reload();
            //or you can sub this page if you're feeling in a silly mood
            this.props.router.push('welcome/'+user.phone);
        })




        this.setState({
            first: '',
            last: '',
            address: '',
            phone: '',
            password: '',
            interests: []
        })
    }

}


const mapStateToProps = (state, ownProps) => {
    // console.log('-----------> Signup Container state', state)
    return {
        currentView: state.currentView,
        allInterests: state.interests.allInterests
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
            addUToDb: function(user){
                dispatch(addUToDb(user));
            },
            changeView: function(view){
                dispatch(changeView(view));
            },
            addLatLongToDb: function(user, lat, long){
                dispatch(addLatLongToDb(user, lat, long))
            },
            validateAddress: function(address){
                dispatch(validateAddress(address))
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);




