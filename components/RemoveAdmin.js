import React from 'react';
import {MenuItem, DropdownButton} from 'react-bootstrap';

const RemoveAdmin = (props) => {
    const allUsers = props.allUsers;
    const removeAdmin=props.removeAdmin;
    return (
        <DropdownButton bsStyle="success" title="Choose" onSelect={removeAdmin} id="removeAdmin" >
            {allUsers.map(function(user){
                if(user.role === "admin") {
                    return <MenuItem eventKey={user} key={user.phone}>{user.fullName}</MenuItem>
                }
            })}
        </DropdownButton>
    )
};

export default RemoveAdmin;
