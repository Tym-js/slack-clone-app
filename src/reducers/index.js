import { combineReducers } from "redux";
import userReducer from "./user";
import channelReducer from "./channel";

export default combineReducers({
  user: userReducer,
  channel: channelReducer
});
