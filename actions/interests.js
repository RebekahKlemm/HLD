/**
 * Created by rebekahklemm on 12/18/16.
 */
import axios from 'axios';
import {RECEIVE_INTERESTS} from './constants';

export const receiveInterests = function (allInterests) {
    return {
        type: RECEIVE_INTERESTS,
        allInterests: allInterests
    };
};
