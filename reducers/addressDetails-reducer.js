import React from 'react'
import {UPDATE_CURRENT_ADDRESS_DETAILS} from '../actions/constants';

const initialState = {
    lat:'',
    long:'',
    stateLegislators: []
}


export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        // case ADD_USER:
        //     newState.allUsers = [...newState.allUsers, action.user];
        //     break;
        // case RECEIVE_USERS:
        //     newState.allUsers = [...newState.allUsers, ...action.allUsers];
        //     break;
        case UPDATE_CURRENT_ADDRESS_DETAILS:
            // console.log('inside addressDetails reducer, here is action', action)
                newState.lat= action.latLong.lat;
                newState.long=action.latLong.lng;
                newState.stateLegislators=action.stateLegislators;
            break;
        default:
            return state;
    }
    return newState;
}
