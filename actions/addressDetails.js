import axios from 'axios';
import {UPDATE_CURRENT_ADDRESS_DETAILS} from './constants';

// export const addUser = function (user) {
//     return {
//         type: ADD_USER,
//         user: user
//     };
// };
//
//
// //asynch action creator (thunk)
// export function addUToDb(user){
//     return function (dispatch){
//         return axios.post('/api/users/signup', user)
//             .then(response => response.data)
//             .then(function(newUser){
//                 dispatch(addUser(newUser))
//             })
//     }
// }

// export const receiveUsers = function (allUsers) {
//     return {
//         type: RECEIVE_USERS,
//         allUsers: allUsers
//     };
// };
//

export const updateCurrentAddressDetails = function (latLong, stateLegislators) {
    console.log('inside updateCurrentAddressDetails, here is latLong', latLong)
    return {
        type: UPDATE_CURRENT_ADDRESS_DETAILS,
        latLong: latLong,
        stateLegislators: stateLegislators
    };
};

// export function addLatLongToDb(user){
//     console.log('inside addLatLongToDb, here is user', user)
//     return function (dispatch){
//         return axios.get('/api/users/'+ user.phone +'/latLong')
//             .then(response => response.data)
//             .then(function(latLong){
//                 console.log('inside addLatLongToDb, here is latLong', latLong)
//                 dispatch(updateCurrentAddressDetails(latLong))
//             })
//     }
// }

// var googleMapsClient = require('@google/maps').createClient({
//     key: 'AIzaSyBFetAhXRcymhUCT9_2_k-nEs8TEkDiOo8'
// });
//
// .then(function(user){
//     // Geocode an address.
//     googleMapsClient.geocode({
//         address: user.address
//     }, function(err, response) {
//         if (!err) {
//             res.send(response.json.results[0].geometry.location);
//         }
//     });
// })

export function addLatLongToDb(user){
    // console.log('inside addLatLongToDb, here is user', user)
    return function (dispatch){
        return axios.get('/api/users/'+ user.phone +'/latLong')
            .then(response => response.data)
            .then(function(latLong){
                return axios.post('/api/users/' + user.phone +'/latLong', latLong)
            })
            // .then(function(latLong){
            //     console.log('inside addLatLongToDb, here is latLong', latLong)
            //     dispatch(updateCurrentAddressDetails(latLong.data))
            //     return latLong
            // })

    }
}


export function validateAddress(address){
    console.log('inside validateAddress in addressDetails action, here is address', address)
    return function (dispatch){
        return axios.get('/api/addressDetails/validate', address)
            .then(response => response.data)
            .then(function(data){
                if (data === 'valid'){
                    console.log('actions address Details, here is data, expect valid', data);
                    return 'valid';
                }
                else {
                    console.log('actions address Details, here is data', data);
                    return 'invalid';
                }
            })

    }
}