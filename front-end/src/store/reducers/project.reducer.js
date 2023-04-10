import { projectConstants } from "../../shared/constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, projects: [] } : {};

export function project(state = initialState, action) {
  switch (action.type) {
    case projectConstants.GET_BY_USERID_AND_FOLDERID_REQUEST:
      return {
        loggingIn: true,
        projects: action.projects,
      };
    case projectConstants.GET_BY_USERID_AND_FOLDERID_SUCCESS:
      return {
        loggedIn: true,
        projects: action.projects,
      };
    case projectConstants.GET_BY_USERID_AND_FOLDERID_FAILURE:
      return {};
    default:
      return state;
  }
}
