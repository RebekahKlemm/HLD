import React from 'react'
import {CHANGE_VIEW} from '../actions/constants';

const initialState = {
    currentView: ''
}


export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case CHANGE_VIEW:
            newState.currentView = action.currentView;
            console.log("newState.currentView inside CHANGE_VIEW reducer", newState.currentView)
            window.location.href = 'http://localhost:3001' + '/#/' + newState.currentView;
            break;
        default:
            return state;
    }
    return newState;
}
