import React, {Component} from 'react';
import { connect } from 'react-redux';
import NewAdmin from '../NewAdmin';
import RemoveAdmin from '../RemoveAdmin';
import {addUserRoleToDb} from '../../actions/users'

class NewAdminContainer extends Component{
    constructor(props){
        super(props)
        this.state={
            user: {},
            showAddConfirmation: false,
            showRemoveConfirmation: false
        }

        this.addAdmin = this.addAdmin.bind(this);
        this.removeAdmin = this.removeAdmin.bind(this);
    }

    render(){
        return (
            <div>
                <div className="col-sm-6">
                    <h3>Add Admin</h3>
                    <NewAdmin allUsers={this.props.allUsers} addAdmin={this.addAdmin} {...this.state}/>
                    { this.state.showAddConfirmation ? <p>{this.state.user.firstName} is now an Admin</p> : null }
                </div>
                <div className="col-sm-6">
                    <h3>Remove Admin</h3>
                    <RemoveAdmin allUsers={this.props.allUsers} removeAdmin={this.removeAdmin} {...this.state}/>
                    { this.state.showRemoveConfirmation ? <p>{this.state.user.firstName} is no longer an Admin</p> : null }

                </div>
            </div>

        )
    }

    addAdmin(user){
        const newRole = 'admin'
        this.props.addUserRoleToDb([user, newRole]);
        this.setState({user:user, showAddConfirmation:true})
        setTimeout(() => this.setState({user:user, showAddConfirmation:false}), 1500)
    }

    removeAdmin(user){
        const newRole = 'user'
        this.props.addUserRoleToDb([user, newRole]);
        this.setState({user:user, showRemoveConfirmation:true})
        setTimeout(() => this.setState({user:user, showRemoveConfirmation:false}), 1500)
    }






}




const mapStateToProps = (state, ownProps) => {
    return {
        allUsers: state.users.allUsers
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addUserRoleToDb: function(user, newRole){
            dispatch(addUserRoleToDb(user, newRole));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAdminContainer);




// {filteredUsers.map(function(user){
//     return(
//         <div className='userList' key={user.phone}>
//             <h4>{user.fullName}</h4>
// {/*</div>*/}
// {/*)*/}
// {/*})*/}
// {/*}*/}

