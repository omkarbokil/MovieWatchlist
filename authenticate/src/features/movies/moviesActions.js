import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "../../db/movieData";

export const movieList = createAsyncThunk(
     'watchlist/movieList',
     async () => {
          const movies = await fetchMovies();

           return movies.map(item => {
               let obj = item[1];
               let firebaseID = item[0];

               obj.dbID = firebaseID;
               return obj;
               
          });
     }
);