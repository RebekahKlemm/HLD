import axios from 'axios';
import {ADD_USER, RECEIVE_USERS, UPDATE_CURRENT_USER, UPDATE_USER , EDIT_USER, REFRESH_USERS, DELETE_USER} from './constants';

export const addUser = function (user) {
    return {
        type: ADD_USER,
        user: user
    };
};


//asynch action creator (thunk)
export function addUToDb(user){
    return function (dispatch){
        return axios.post('/api/users/signup', user)
            .then(response => response.data)
            .then(function(newUser){
              dispatch(addUser(newUser))
            })
    }
}


//asynch action creator (thunk)
export function deleteUinDb(user){
    return function (dispatch){
        return axios.post('/api/users/delete', user)
            .then(response => response.data)
            .then(function(users){
                dispatch(refreshUsers(users))
            })
    }
}

export const receiveUsers = function (allUsers) {
    return {
        type: RECEIVE_USERS,
        allUsers: allUsers
    };
};


export const updateCurrentUser = function (user) {
    return {
        type: UPDATE_CURRENT_USER,
        user: user
    };
};


export const updateUser = function (oldUser, updatedUser) {
    return {
        type: UPDATE_USER,
        oldUser: oldUser,
        updatedUser: updatedUser
    };
};


//asynch action creator (thunk)
export function addUserRoleToDb(user){
    return function (dispatch){
        return axios.post('/api/users/changeUserRole', user)
            // .then(function(response){
            //     // console.log('RRRRRRRResponse', response)
            //     return response
            // })
            .then(response => response.data)
            .then(function(updatedUser){
                // console.log('updatedUser ----------->', updatedUser)
                dispatch(updateUser(user[0], updatedUser))
            })
    }
}

//coming in, user is an array of two objects, the first is the original user data, the second is the updated data
export function editUinDb(user){
    return function (dispatch){
        return axios.post('/api/users/edit', user)
            .then(function(latLong){
                // console.log('axios users lat long', latLong)
                axios.post('/api/users/' + user[0].phone + '/latLong', latLong.data)
                    .then(function(){
                        return axios.get('/api/users/')
                    })
                    .then(response => response.data)
                    .then(function(users){
                        // console.log('editUinDB', users)
                        dispatch(refreshUsers(users));
                    })
            })

    }
}



export const refreshUsers = function (users) {
    return {
        type: REFRESH_USERS,
        users: users
    };
};


export function setSession(user){
    return function (dispatch){
        return axios.post('/api/users/login', user)
        // .then(function(response){
        //     // console.log('RRRRRRRResponse', response)
        //     return response
        // })
        //     .then(response => response.data)
        //     .then(function(updatedUser){
        //         // console.log('updatedUser ----------->', updatedUser)
        //         dispatch(updateUser(user[0], updatedUser))
        //     })
    }
}






