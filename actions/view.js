import {CHANGE_VIEW} from './constants';

export const changeView = function (view) {
    return {
        type: CHANGE_VIEW,
        currentView: view
    };
};
