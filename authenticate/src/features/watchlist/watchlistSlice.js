import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadWatchlist } from "./watchlistActions";

const URL = 'https://movie-watchlist-553ec-default-rtdb.firebaseio.com/movie-watchlist.json';

const initialState = {
     watchlist : [],
     loading: false,
     error: null
}

export const watchlistSlice = createSlice({
     name : 'watchlist',
     initialState,
     reducers : {
          addWatchlist : (state, action) => {
               const watchlist = {
                    id: nanoid(),
                    watchlistID : 'watchlist-'+nanoid(),
                    text: action.payload,
                    email : localStorage.getItem('email')
               }

               state.watchlist.push(watchlist);

               const postWatchlist = async () => {
                    try{
                         const postResponse = await fetch(URL, {
                              method: 'POST',
                              headers: {
                                   'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(watchlist)
                         }).then((response) => {
                              console.log('Watchlist Added Successfully');
                         }).catch((error) => {
                              console.log('Failed to Post Data');
                         })
                    }catch(error) {
                         console.log('Failed to Post Data');
                    }
               }
               postWatchlist();
          },
          removeWatchlist : (state, action) => {

               let id = action.payload;
               let dbID;

               state.watchlist.map((e) => {
                    if(e.id == id){
                         dbID = e.dbID;
                    }
               })

               const deleteURL = `https://movie-watchlist-553ec-default-rtdb.firebaseio.com/movie-watchlist/${dbID}/id.json`;

               const deleteWatchlist = async () => {
                    try{
                         const postResponse = await fetch(deleteURL, {
                              method: 'DELETE',
                              headers: {
                                   'Content-Type': 'application/json'
                              },
                         }).then((response) => {
                              console.log('Watchlist Deleted Successfully', response);
                         }).catch((error) => {
                              console.log('Failed to Delete Data');
                         })
                    }catch(error) {
                         console.log('Failed to Delete Data');
                    }
               }
               deleteWatchlist();

               state.watchlist = state.watchlist.filter((w) => {
                    return w.id !== action.payload
               })
          },
          addMovieToWatchlist : (state, action) => {

               const { watchlistID, watchlistName, movieID, movieTitle, movieYear } = action.payload;

               const movie = {
                    id: nanoid(),
                    watchlistID : watchlistID,
                    watchlistName : watchlistName,
                    movieID : movieID,
                    movieTitle : movieTitle,
                    movieYear : movieYear,
                    email : localStorage.getItem('email')
               }

               const addMovie = async () => {
                    try{
                         const postResponse = await fetch(URL, {
                              method: 'POST',
                              headers: {
                                   'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(movie)
                         }).then((response) => {
                              console.log('Movie added to watchlist successfully');
                         }).catch((error) => {
                              console.log('Failed to add movie to watchlist');
                         })
                    }catch(error) {
                         console.log('Failed to add movie to watchlist');
                    }
               }
               addMovie();
          }
     },
     extraReducers: (builder) => {
          builder
              .addCase(loadWatchlist.pending, (state) => {
                  state.loading = true;
                  state.error = null;
              })
              .addCase(loadWatchlist.fulfilled, (state, action) => {
                  state.watchlist = action.payload;
                  state.loading = false;
              })
              .addCase(loadWatchlist.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.error.message;
              });
      },
})

export const {addWatchlist, addMovieToWatchlist, removeWatchlist} = watchlistSlice.actions;

export default watchlistSlice.reducer;