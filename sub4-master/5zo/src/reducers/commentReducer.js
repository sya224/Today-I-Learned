import { FETCH_COMMENTS, DELETE_COMMENT, PUT_COMMENT } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:

      return {
        ...state,
        [action.payload.cardlist_id]: _.mapKeys(
          action.payload.comments,
          "comment_id"
        )
      };
    case DELETE_COMMENT:
    return {
      ...state,
      [action.payload.cardlist_id]: {
        ...state[action.payload.cardlist_id],
        [action.payload.comment_id]: {
          ...state[action.payload.cardlist_id][action.payload.comment_id],
          comment_deleted: 1
        }
      }
    };
    case PUT_COMMENT:
      return {
        ...state,
        [action.payload.cardlist_id]: {
          ...state[action.payload.cardlist_id],
          [action.payload.comment_id]: action.payload
        }
      };
    default:
      return state;
  }
};
