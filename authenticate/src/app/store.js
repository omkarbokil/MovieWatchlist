import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from '../features/watchlist/watchlistSlice'
import loginSlice from '../features/login/loginSlice';

const store = configureStore({
     reducer: {
       watchlist: watchlistReducer,
       login : loginSlice
     },
   });

export default store;