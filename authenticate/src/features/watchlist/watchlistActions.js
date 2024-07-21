import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWatchlist } from "../../db/watchlistData";

export const loadWatchlist = createAsyncThunk(
     'watchlist/loadWatchlist',
     async () => {
          const watchlist = await fetchWatchlist();

          return watchlist.map(item => {
               let obj = item[1];
               let firebaseID = item[0];

               obj.dbID = firebaseID;
               return obj;
          });
     }
);