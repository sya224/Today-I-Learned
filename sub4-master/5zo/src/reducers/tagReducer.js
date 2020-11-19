import {
  MEM_TAG,
  GET_ALL_TAG,
  FETCH_TAG,
  ADD_TAG,
  DELETE_TAG,
  LOGOUT
} from "actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case MEM_TAG:
      return { ...state, mem_tags: action.payload };
    case GET_ALL_TAG:
      return { ...state, tags: action.payload };
    case FETCH_TAG:
      return { ...state, [action.payload.cardlist_id]: action.payload.tags };
    case ADD_TAG:
      return {
        ...state,
        [action.payload.cardlist_id]: state[action.payload.cardlist_id]
          ? [...state[action.payload.cardlist_id], action.payload.tag]
          : [action.payload.tag],
        // mem_tags: [...state.mem_tags, action.payload.tag]
        mem_tags: _.union(state.mem_tags, [action.payload.tag])
      };
    case DELETE_TAG:
      return {
        ...state,
        [action.payload.cardlist_id]: Object.values(
          _.omitBy(state[action.payload.cardlist_id], {
            tag_id: action.payload.tag_id
          })
        )
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
