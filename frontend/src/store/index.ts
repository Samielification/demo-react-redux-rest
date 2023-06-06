import { configureStore } from '@reduxjs/toolkit';
import { reducer as studentsReducer } from './slices/students'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        students: studentsReducer,
    },
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispath>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;