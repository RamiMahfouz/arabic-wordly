import {combineReducers} from "redux";
import {dialogsReducer} from "./dialogs.reducer";

export const rootReducer = combineReducers({
    dialogs:dialogsReducer, 
});

