import { combineReducers } from "@reduxjs/toolkit";
import { reducer as studentReducer } from "../slices/students";

export default combineReducers({
    student: studentReducer
})