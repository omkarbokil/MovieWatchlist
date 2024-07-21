import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from '../features/watchlist/watchlistSlice'
import movieReducer from '../features/movies/moviesSlice'
import loginSlice from '../features/login/loginSlice';

const store = configureStore({
     reducer: {
       watchlist: watchlistReducer,
       login : loginSlice,
       movies : movieReducer
     },
   });

export default store;