import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userReducer from './reducer/userSlice'
import adminReducer from './reducer/adminSlice'

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
