import rootReducer from "./rootReducer";
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) });

export default store;
