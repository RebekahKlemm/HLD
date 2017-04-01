import {RECEIVE_ALERTS, UPDATE_CURRENT_ALERTS, ADD_ALERT, REFRESH_ALL_ALERTS} from './constants';
import axios from 'axios';



export const receiveAlerts = function (allAlerts) {
    console.log('here is allAlerts in the alerts Action', allAlerts)
    return {
        type: RECEIVE_ALERTS,
        allAlerts: allAlerts
    };
};

export const updateCurrentAlerts = function (alerts) {
    console.log('got into updateCurrentAlerts, here is alerts', alerts)
    return {
        type: UPDATE_CURRENT_ALERTS,
        currentAlerts: alerts
    };
};

export const refreshAllAlerts = function (alerts) {
    return {
        type: REFRESH_ALL_ALERTS,
        allAlerts: alerts
    };
};


export const addAlert = function (alert) {
    console.log("inside addAlert action, here is alert", alert)
    return {
        type: ADD_ALERT,
        alert: alert
    };
};


//asynch action creator (thunk)
export function addAToDb(alert, interests, due){
    // console.log('AAAAAAAACtion alert', alert);
    // console.log('inside addAToDb, here is due', due)
    return function (dispatch){
        return Promise.all([axios.post('/api/alerts/newAlert', [alert, interests, due])])
            // .then(function(response){
            //     // console.log('RRRRRRRResponse', response)
            //     return response
            // })
            // .then(response => response.data)
            // .then(function(newAlert){
            //     console.log('inside actions alert, here is newAlert', newAlert)
            //     dispatch(addAlert(newAlert))
            // })
            .then(function(){
                axios.get('/api/alerts/')
                    .then(response => response.data)
                    .then(function(alerts){
                        dispatch(updateCurrentAlerts(alerts))
                        dispatch(refreshAllAlerts(alerts))
                    })

            })
    }
}