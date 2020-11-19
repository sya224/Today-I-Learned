import { GET_DAILY_CAL } from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case GET_DAILY_CAL:
            return{...state, 'info' : action.payload}
        default:
            return state; 
    }
}