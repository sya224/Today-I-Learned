import { SET_EDIT_MODE_CARD,SET_EDIT_MODE_LIST } from 'actions/types'


export default (state=null,action)=>{
    if (action.type===SET_EDIT_MODE_CARD){
        return action.payload
    }
    if (action.type === SET_EDIT_MODE_LIST){
        return null
    }
    return state
}