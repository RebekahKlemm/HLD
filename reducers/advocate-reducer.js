import React from 'react'
import {ADD_ADVOCATE, RECEIVE_ADVOCATES, SET_CURRENT_ADVOCATE, CHECK_IN_ADVOCATE} from '../actions/constants';

const initialState = {
    allAdvocates: [],
    currentAdvocate: {}
}


export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case ADD_ADVOCATE:
            newState.allAdvocates = [...newState.allAdvocates, action.advocate];
            break;
        case RECEIVE_ADVOCATES:
            newState.allAdvocates = action.allAdvocates;
            break;
        case SET_CURRENT_ADVOCATE:
            newState.currentAdvocate = Object.assign({}, action.currentAdvocate);
            break;
        case CHECK_IN_ADVOCATE:
            newState.currentAdvocate = Object.assign(newState.currentAdvocate, action.updatedAdvocate);
            break;
        default:
            return state;
    }

    return newState;
}