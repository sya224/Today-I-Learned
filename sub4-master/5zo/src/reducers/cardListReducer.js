import {
  FETCH_LIST,
  ADD_LIST,
  ADD_CARD,
  DELETE_CARD,
  DELETE_LIST,
  EDIT_LIST
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { cardlist_id, card_id } = action.payload;
      const cardlist = state[cardlist_id];
      const lists = Array.isArray(cardlist.cardlist_cards)
        ? cardlist.cardlist_cards
        : JSON.parse(cardlist.cardlist_cards);
      lists.push(card_id);
      return { ...state, [cardlist_id]: cardlist };
    }

    case DELETE_CARD: {
      const { cardlist } = action.payload;
      return { ...state, [cardlist.cardlist_id]: cardlist };
    }

    case ADD_LIST:
      const cardlist = action.payload[0];
      return {
        ...state,
        [cardlist.cardlist_id]: { ...cardlist, cardlist_cards: [] }
      };
    case FETCH_LIST:
      const card = action.payload[0];
      card.cardlist_cards = JSON.parse(card.cardlist_cards);
      return { ...state, [card.cardlist_id]: card };
    case EDIT_LIST:
      return { ...state, [action.payload.cardlist_id]: action.payload };
    case DELETE_LIST:
      return _.omit(state, action.payload.list_id);

    default:
      return state;
  }
};
