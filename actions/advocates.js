import axios from 'axios';
import {ADD_ADVOCATE, RECEIVE_ADVOCATES, SET_CURRENT_ADVOCATE, CHECK_IN_ADVOCATE} from './constants';

export const addAdvocate = function (advocate) {
    return {
        type: ADD_ADVOCATE,
        advocate: advocate
    };
};


// asynch action creator (thunk)
export function addAToDb(advocate){
    return function (dispatch){
        return axios.post('/api/advocates/add', advocate)
            .then(response => response.data)
            .then(function(newAdvocate){
                dispatch(addAdvocate(newAdvocate))
            })
    }
}




export const receiveAdvocates = function (allAdvocates) {
    return {
        type: RECEIVE_ADVOCATES,
        allAdvocates: allAdvocates
    };
};


export const setCurrentAdvocate = function (advocate){
    return {
        type: SET_CURRENT_ADVOCATE,
        currentAdvocate: advocate
    }
};

export const updateAdvocate = function (updatedAdvocate){
    return {
        type: CHECK_IN_ADVOCATE,
        updatedAdvocate: updatedAdvocate
    }
}


// asynch action creator (thunk)
export function checkInAdvocate([advocateId, checkInStatus]){
    return function (dispatch){
        return axios.post('/api/advocates/checkIn', [advocateId, checkInStatus])
            .then(updatedAdvocate => updatedAdvocate.data)
            .then(function(updatedAdvocate){
                dispatch(updateAdvocate(updatedAdvocate))
            })
    }
}



// export const refreshUsers = function (users) {
//     return {
//         type: REFRESH_USERS,
//         users: users
//     };
// };








