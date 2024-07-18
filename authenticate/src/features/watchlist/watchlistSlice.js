import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
     watchlist : []
}

export const watchlistSlice = createSlice({
     name : 'watchlist',
     initialState,
     reducers : {
          addWatchlist : (state, action) => {
               const watchlist = {
                    id: nanoid(),
                    text: action.payload,
                    email : localStorage.getItem('email')
               }
               state.watchlist.push(watchlist)
               
               const URL = 'https://movie-watchlist-553ec-default-rtdb.firebaseio.com/movie-watchlist.json';

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
          adddbWatchlist : (state, action) => {
               const watchlist = action.payload
               state.watchlist.push(watchlist);
          },
          removeWatchlist : (state, action) => {
               state.watchlist = state.watchlist.filter((w) => 
                    w.id !== action.payload
               )
          }
     }
})

export const {addWatchlist, adddbWatchlist, removeWatchlist} = watchlistSlice.actions;

export default watchlistSlice.reducer;