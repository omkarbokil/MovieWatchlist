export const fetchWatchlist = async () => {
     const response = await fetch('https://movie-watchlist-553ec-default-rtdb.firebaseio.com/movie-watchlist.json');
     if (!response.ok) {
         throw new Error('Network response was not ok');
     }
     const data = await response.json();

     const filteredData = Object.entries(data).filter(([key, value]) =>
          value.email == localStorage.getItem('email') && value.id && value.text && value.email
     )

     return filteredData;
 };