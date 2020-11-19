import {
  ADD_BOARD,
  ADD_LIST,
  DELETE_LIST,
  FETCH_DAILY_LIST,
  FETCH_TODO_LIST,
  GET_DAILY_CAL,
  LOGOUT
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_BOARD:
      const board = action.payload;
      board.board_lists = [];
      return { ...state, [action.payload.board_id]: board };

    case FETCH_DAILY_LIST: {
      const board = action.payload;
      board.board_lists = JSON.parse(board.board_lists);
      return { ...state, [action.payload.board_id]: board };
    }
    case GET_DAILY_CAL: {
      return { ...state, info: action.payload };
    }
    case FETCH_TODO_LIST: {
      const board = action.payload;
      board.board_lists = JSON.parse(board.board_lists);
      return { ...state, [action.payload.board_id]: board };
    }

    case ADD_LIST: {
      const { board_id, cardlist_id } = action.payload[0];
      const board = state[board_id];
      const lists = Array.isArray(board.board_lists)
        ? board.board_lists
        : JSON.parse(board.board_lists);
      lists.push(cardlist_id);
      return {
        ...state,
        [board_id]: board
      };
    }
    case LOGOUT: {
      return {};
    }
    case DELETE_LIST: {
      const { board } = action.payload;
      return { ...state, [board.board_id]: board };
    }

    default:
      return state;
  }
};
