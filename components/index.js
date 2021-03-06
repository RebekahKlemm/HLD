import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, browserHistory} from 'react-router';




// import Signup from './Signup';
import SignupContainer from './containers/SignupContainer';
import {App} from './App';
import LoginContainer from './containers/LoginContainer';
import UserDisplay from './containers/UserDisplay';
import AdminContainer from './containers/AdminContainer';
import Welcome from './containers/Welcome';
import CheckInContainer from './containers/CheckInContainer';
import CoverageContainer from './containers/CoverageContainer';
import Advocate from './containers/Advocate';
import {Provider} from 'react-redux';
import store from '../store';
import {addUtoDb} from '../actions/users';
import axios from 'axios';
import {receiveUsers, updateCurrentUser} from '../actions/users';
import {receiveAlerts, updateCurrentAlerts} from '../actions/alerts';
import {receiveInterests} from '../actions/interests';
import {updateCurrentAddressDetails} from '../actions/addressDetails';
import {receiveAdvocates, setCurrentAdvocate} from '../actions/advocates';

const onAppEnter = function () {
    console.log('inside AppEnter');
    Promise.all([
        axios.get('/api/users'),
        axios.get('/api/alerts'),
        axios.get('/api/interests'),
        axios.get('/api/advocates')
    ])
        .then(responses => responses.map(r => r.data))
        .then(([users, alerts, interests, advocates]) => {
            store.dispatch(receiveUsers(users));
            store.dispatch(receiveAlerts(alerts));
            store.dispatch(receiveInterests(interests));
            store.dispatch(receiveAdvocates(advocates));
        })

};

const onUserDisplayEnter = function (props) {
    Promise.all([
        axios.get('/api/users/' + props.params.id),
        axios.get('/api/alerts/' + props.params.id),
        axios.get('/api/users/'+ props.params.id +'/latLong'),
        axios.get('/api/users/'+ props.params.id + '/legislators')
    ])
        .then(responses => responses.map(r => r.data))
        .then(([user, alerts, latLong, stateLegislators]) => {
            store.dispatch(updateCurrentUser(user));
            store.dispatch(updateCurrentAlerts(alerts));
            store.dispatch(updateCurrentAddressDetails(latLong, stateLegislators));
        })

};

const onAdvocateEnter = function (props){
    console.log('onAdvocateEnter')

    axios.get('/api/advocates/' + props.params.id)
        .then(response => response.data)
        .then(advocate => store.dispatch(setCurrentAdvocate(advocate)))
};

const onCheckInEnter = function (){
    console.log('onCheckInEnter')
    axios.get('/api/advocates/')
        .then(response => response.data)
        .then(advocates => store.dispatch(receiveAdvocates(advocates)))
};

// const onCoverageEnter = function(){
//
// }



ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App} onEnter={onAppEnter}>
                <IndexRoute component={CheckInContainer} onEnter={onCheckInEnter}/>
                <Route path ='/login' component={LoginContainer}/>
                <Route path ='/welcome/:id' component={Welcome}/>
                <Route path='/user/:id' component={UserDisplay} onEnter={onUserDisplayEnter}/>
                <Route path='/admin/:id' component={AdminContainer} onEnter={onUserDisplayEnter}/>
                <Route path='/checkin' component={CheckInContainer} onEnter={onCheckInEnter}/>
                <Route path='/checkin/:id' component={Advocate} onEnter={onAdvocateEnter}/>
                <Route path='/signup' component={SignupContainer}/>
                <Route path='/coverage' component={CoverageContainer} onEnter={onCheckInEnter}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

