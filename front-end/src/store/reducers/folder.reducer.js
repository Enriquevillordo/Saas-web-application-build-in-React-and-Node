import { folderConstants } from '../../shared/constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, folders: [] } : {};

export function folder(state = initialState, action) {
    switch (action.type) {
        case folderConstants.GET_REQUEST:
            return {
                loggingIn: true,
                folders: action.folders
            };
        case folderConstants.GET_SUCCESS:
            return {
                loggedIn: true,
                folders: action.folders
            };
        case folderConstants.GET_FAILURE:
            return {};
        default:
            return state
    }
}