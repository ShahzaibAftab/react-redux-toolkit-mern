import { configureStore } from "@reduxjs/toolkit";
import userreducer from './userSlice';

const store = configureStore({
    reducer: {
        users: userreducer
    }
});
export default store;
