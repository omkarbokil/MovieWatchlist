export const fetchMovies = async () => {
     const response = await fetch('https://movie-watchlist-553ec-default-rtdb.firebaseio.com/movie-watchlist.json');
     if (!response.ok) {
         throw new Error('Network response was not ok');
     }
     const data = await response.json();

     const uniqueMovieIDs = new Set();

     const filteredData = Object.entries(data).filter(([key, value]) => {
          const isUnique = value.email === localStorage.getItem('email') &&
                           value.id && value.movieID && value.watchlistID &&
                           !uniqueMovieIDs.has(value.movieID);
          if (isUnique) {
              uniqueMovieIDs.add(value.movieID);
          }
          return isUnique;
      });
  
      return filteredData;
 };