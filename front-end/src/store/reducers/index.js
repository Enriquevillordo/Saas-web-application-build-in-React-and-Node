import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { alert } from "./alert.reducer";
import { folder } from "./folder.reducer";
import { project } from "./project.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  folder,
  project,
});

export default rootReducer;
