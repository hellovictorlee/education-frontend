import { combineReducers } from "redux";
import project from "./project";

const rootReducer = combineReducers({
  project: project,
});

export default rootReducer;
