import {configureStore} from '@reduxjs/toolkit';
import noteReducer from  '../features/notes/noteSlice';
import userReducer from '../features/user/userSclice'

export const store = configureStore({
    reducer:{
        note:noteReducer,
        user:userReducer
    }
});