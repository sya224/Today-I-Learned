import {
  ADD_ALARM,
  FETCH_ALARMS,
  READ_ALARM,
  READ_ALL_ALARM,
  LOGOUT
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_ALARM:
      return { ...state, [action.payload.alarm_id]: action.payload };
    case FETCH_ALARMS:
      return {
        ..._.mapKeys(action.payload, "alarm_id")
      };
    case READ_ALARM:
      return _.omit(state, action.payload);
    case READ_ALL_ALARM:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
