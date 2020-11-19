import {FETCH_STATISTICS_MEMBER} from "../actions/types"
import {FETCH_STATISTICS_DATA} from "../actions/types"

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STATISTICS_MEMBER: {
      return { ...state, "mem_info" : action.payload};
    }
    case FETCH_STATISTICS_DATA: {
      return { ...state, "info" : action.payload};
    }
    default: 
      return state;
  }
};