import {AnyAction, combineReducers} from "redux";
import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {chatReducer} from "bll/reducers/chat-reducer";

const rootReducer = combineReducers({
  chat: chatReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).prepend(thunk)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

// @ts-ignore
window.store = store