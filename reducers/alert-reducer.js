import React from 'react'
import {RECEIVE_ALERTS, UPDATE_CURRENT_ALERTS, ADD_ALERT, REFRESH_ALL_ALERTS} from '../actions/constants';

const initialState = {
    allAlerts: [],
    currentAlerts: []
}


export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_ALERTS:
            newState.allAlerts = [...newState.allAlerts, ...action.allAlerts];
            break;
        case REFRESH_ALL_ALERTS:
            newState.allAlerts = [...action.allAlerts]
            break;
        case UPDATE_CURRENT_ALERTS:
            newState.currentAlerts = [...action.currentAlerts]
            break;
        case ADD_ALERT:
            newState.allAlerts = [...newState.allAlerts, action.alert];
            newState.currentAlerts = [...newState.currentAlerts, action.alert];
            break;
        default:
            return state;
    }
    return newState;

}
