import {SEARCH_KEYWORD , SEARCH_CARDLIST} from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case SEARCH_KEYWORD:
            return{...state, 'cards' : action.payload}
        case SEARCH_CARDLIST:
            return{...state, 'cardLists' : action.payload}
        default:
            return state; 
    }
}