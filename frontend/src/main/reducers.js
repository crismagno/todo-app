import { combineReducers } from "redux"
import todoReducers from "../todo/todoReducers";

const rootReducer = combineReducers({
    todo: todoReducers
})

export default rootReducer