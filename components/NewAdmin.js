import React from 'react';
import {MenuItem, DropdownButton} from 'react-bootstrap';

const NewAdmin = (props) => {
    const allUsers = props.allUsers;
    const addAdmin=props.addAdmin;
        return (
                <DropdownButton bsStyle="success" title="Choose" onSelect={addAdmin} id="addAdmin" >
                    {allUsers.map(function(user){
                        if(user.role !== "admin") {
                            return <MenuItem eventKey={user} key={user.phone}>{user.fullName}</MenuItem>
                        }
                    })}
                </DropdownButton>
        )
};

export default NewAdmin;


//
// <div>
//     <form onSubmit={addAdmin} >
//         <FormControl componentClass="select" placeholder="select" >
//             {console.log('AAAAALLLLUSERS', {allUsers})}
//             <option name='user0' value='Joe' key='0' >Joe</option>
//             <option name='user1' value='Bill' key='1'>Bill</option>
//             <option name='user2' value='Susie' key='2'>Susie</option>
//
//             {/*{allUsers.map(function(user){*/}
//             {/*return(*/}
//             {/*<option name='user' value={user} key={user.phone}>{user.fullName}</option>*/}
//             {/*)*/}
//             {/*})}*/}
//         </FormControl>
//         <Button type="submit">
//             <span className="glyphicon glyphicon-plus"/> SUBMIT
//         </Button>
//
//     </form>
// </div>





// {/*<form className='form-group' style={{marginTop: '20px'}} onSubmit={props.addAdmin}>*/}
//     {/*<input*/}
//         {/*onChange={handleChange}*/}
//         {/*value={inputValue}*/}
//         {/*className='form-control'*/}
//         {/*placeholder="Enter user name"*/}
//     {/*/>*/}
//
{/*<button type="submit" form="new-admin-form" value="Submit"*/}
        {/*className="btn btn-primary btn-block">*/}
    {/*<span className="glyphicon glyphicon-plus"/> SUBMIT*/}
{/*</button>*/}

{/*<Button type="submit" form="new-admin-form" value="Submit"*/}
{/*className="btn btn-primary btn-block">*/}
    {/*<span className="glyphicon glyphicon-plus"/> SUBMIT*/}
    {/*</Button>*/}

// onSubmit={console.log('wtf')}