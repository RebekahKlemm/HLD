import React, {Component} from 'react';
import { connect } from 'react-redux';

import EditUser from '../EditUser';
import DeleteUser from '../DeleteUser';
import {addUser, editUinDb, deleteUinDb} from '../../actions/users'
import {addLatLongToDb} from '../../actions/addressDetails'

class EditUserContainer extends Component{
    constructor(props){
        super(props)

        this.state = {
            first: '',
            last: '',
            address: '',
            password: '',
            interests: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

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
        return (
            <div>
                <EditUser allInterests={this.props.allInterests} handleInputChange={this.handleInputChange} editUser={this.editUser} {...this.state} />
                 <DeleteUser deleteUser={this.deleteUser}/>
            </div>
        )
    }

    editUser(e){
        // console.log('------------> e in EditUserContainer.target', e.target)
        e.preventDefault();
        // console.log('...........this.state.interests', this.state.interests)
        const updatedUser = {
            first: e.target.first.value || this.props.currentUser.firstName,
            last: e.target.last.value || this.props.currentUser.lastName,
            address: e.target.address.value || this.props.currentUser.address,
            phone: this.props.currentUser.phone,
            password: e.target.password.value || this.props.currentUser.password,
            interests: this.state.interests || this.props.currentUser.interests
        }


        this.props.editUinDb([this.props.currentUser, updatedUser]);
        // console.log("EditUser Container between editUinDb and addLatLongToDb")

        // this.props.addLatLongToDb(updatedUser);


        // console.log("congrats, you edited your details")
        // this.props.router.push('welcome/'+user.phone);
        // this.props.router.push('user/'+user.phone);

        this.setState({
            first: '',
            last: '',
            address: '',
            password: '',
            interests: []
        })
        alert('Congratulations, you edited your account');
        window.location.reload();
        // this.props.router.push('/'+ this.props.currentUser.role + '/'+ this.props.currentUser.phone);
    }



    deleteUser(e){
        e.preventDefault();
        this.props.deleteUinDb(this.props.currentUser);
        alert('Ooops! You deleted your account.  This was surely an accident, so we will redirect you to the signup page so you can fix this mistake.');
        console.log('this.props', this.props.router);
        this.props.router.push('/');

    }

}


const mapStateToProps = (state, ownProps) => {
    // console.log('-----------> EditUser Container state', state)
    return {
        // currentView: state.currentView,
        allInterests: state.interests.allInterests,
        currentUser: state.users.currentUser
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editUinDb: function(user){
            dispatch(editUinDb(user));
        },
        // changeView: function(view){
        //     dispatch(changeView(view));
        // },
        addLatLongToDb: function(user, lat, long){
            dispatch(addLatLongToDb(user, lat, long))
        },
        deleteUinDb: function(user){
            dispatch(deleteUinDb(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserContainer);





