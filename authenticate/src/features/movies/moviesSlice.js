// watchlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { movieList } from './moviesActions';

const initialState = {
     movies : [],
     loading: false,
     error: null
}

const movieSlice = createSlice({
     name: 'movies',
     initialState,
     reducers: {
          removeMovie : (state, action) => {

               let id = action.payload;
               let dbID;

               state.movies.map((e) => {
                    if(e.id == id){
                         dbID = e.dbID;
                    }
               })

               const removeURL = `https://movie-watchlist-553ec-default-rtdb.firebaseio.com/movie-watchlist/${dbID}.json`;

               const deleteMovie = async () => {
                    try{
                         const postResponse = await fetch(removeURL, {
                              method: 'DELETE',
                              headers: {
                                   'Content-Type': 'application/json'
                              },
                         }).then((response) => {
                              console.log('Movie removed from watchlist Successfully', response);
                         }).catch((error) => {
                              console.log('Failed to remove movie');
                         })
                    }catch(error) {
                         console.log('Failed to remove movie');
                    }
               }
               deleteMovie();

               state.movies = state.movies.filter((w) => {
                    return w.id !== action.payload
               })
          },
     },
     extraReducers: (builder) => {
          builder
               .addCase(movieList.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(movieList.fulfilled, (state, action) => {
                    state.movies = action.payload;
                    state.loading = false;
               })
               .addCase(movieList.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               });
    },
});

export const {removeMovie} = movieSlice.actions;

export default movieSlice.reducer;
