import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import backlogReducer from "./backlogReducer";
import securityReducer from "./securityReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer,
  security: securityReducer,
  profile: profileReducer
});
