import React from 'react';
import { combineReducers } from 'redux'
import users from './user-reducer';
import alerts from './alert-reducer';
import currentView from './currentView-reducer';
import interests from './interest-reducer';
import addressDetails from './addressDetails-reducer';
import advocates from './advocate-reducer';


export default combineReducers({users, alerts, currentView, interests, addressDetails, advocates});