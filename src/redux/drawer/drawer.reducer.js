import { drawerActionTypes } from "./drawer.type";

const INITIAL_STATE = {
    drawer:false,
}

const drawerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case drawerActionTypes.TOGGLE_DRAWER:
            return{
                ...state,
                drawer:!state.drawer
            }
        default:
            return state
    }
}

export default drawerReducer;