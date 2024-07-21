import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from '../features/watchlist/watchlistSlice'
import movieReducer from '../features/movies/moviesSlice'

const store = configureStore({
     reducer: {
       watchlist: watchlistReducer,
       movies : movieReducer
     },
   });

export default store;