import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import drawerReducer from "./drawer/drawer.reducer";

const persistConfig = {
    key:'root',
    storage,
    whitelist:['drawer']
}
const rootReducer = combineReducers({
    drawer:drawerReducer
})

export default persistReducer(persistConfig,rootReducer);