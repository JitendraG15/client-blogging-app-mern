import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import postReducer from "../slices/post";
import categoryReducer from "../slices/category";
import sidebarReducer from "../slices/Sidbar"

const rootReducer = combineReducers({
  auth: authReducer,
  profile:profileReducer,
  post:postReducer,
  category:categoryReducer,
  sidebar:sidebarReducer
})

export default rootReducer;
