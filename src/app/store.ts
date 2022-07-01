import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../reducers/studentsReducer';

import { Action, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'


const reducers = combineReducers({
  studentsReducer,
})
export const store = configureStore({
  reducer: reducers
})

export type AppDispatch = typeof store.dispatch;
type RootReducerType = typeof reducers
export type RootStateType = ReturnType<RootReducerType>
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootStateType, unknown, A>

export default reducers