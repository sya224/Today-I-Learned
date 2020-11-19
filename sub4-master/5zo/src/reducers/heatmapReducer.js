import { GET_DAILY_TASK, GET_DAILY_TASK_RESET } from "actions/types";
import _ from "lodash";
export default (state = {}, action) => {
  switch (action.type) {
    case GET_DAILY_TASK:
      return {
        ...state,
        info: state.info
          ? _.unionWith(state.info, action.payload, _.isEqual)
          : action.payload
      };
    case GET_DAILY_TASK_RESET:
      return _.omit(state, "info");
    default:
      return state;
  }
};
