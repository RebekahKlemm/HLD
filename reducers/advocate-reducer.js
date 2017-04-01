import React from 'react'
import {ADD_ADVOCATE, RECEIVE_ADVOCATES} from '../actions/constants';

const initialState = {
    allAdvocates: []
}


export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case ADD_ADVOCATE:
            newState.allAdvocates = [...newState.allAdvocates, action.advocate];
            break;
        case RECEIVE_ADVOCATES:
            newState.allAdvocates = [...newState.allAdvocates, ...action.allAdvocates];
            break;
        default:
            return state;
    }

    return newState;
}