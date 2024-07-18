import React from 'react'
import AddWatchlist from './AddWatchlist'
import { useSelector, useDispatch } from 'react-redux'
import { adddbWatchlist, removeWatchlist } from '../features/watchlist/watchlistSlice'
import { useState, useEffect } from 'react'

function Watchlist() {

  const dispatch = useDispatch()

  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://movie-watchlist-553ec-default-rtdb.firebaseio.com/movie-watchlist.json';
      try {
        const response = await fetch(url);
        const result = await response.json();

        const filteredData = Object.entries(result).filter(([key, value]) =>
          value.email == localStorage.getItem('email') && value.id && value.text && value.email
        )

        filteredData.map((e,v) => {
          dispatch(adddbWatchlist(e[1]))
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const watchlist = useSelector((state) => state.watchlist.watchlist)

  return (
    <main className='pt-10 lg:px-40 px-20'>
      <div className='flex flex-col justify-center items-center gap-10'>
        <h1 className='font-bold sm:text-6xl text-3xl text-[#023047]'>
          Watchlist
        </h1>
      </div>
      <div>
        <AddWatchlist/>
      </div>
      <div className='mt-10'>
        <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-4'>
          {
            watchlist.map((value) => (
              <div key={value.id} className='border flex items-center justify-between p-5 gap-10 rounded-md bg-white cursor-pointer hover:shadow-lg transition-all hover:transition-all'>
                <p className='font-bold max-w-60 overflow-hidden text-ellipsis'>
                  {value.text}
                </p>
                <div className='space-x-3 flex flex-nowrap'>
                  <div className='group cursor-pointer rounded-full relative flex justify-center'>
                    <span class="material-symbols-rounded bg-black/30 text-[#fff] p-2 rounded-full hover:bg-red-600 hover:text-white transition-all hover:scale-[1.1] hover:shadow-lg" onClick={() => dispatch(removeWatchlist(value.id))}>
                      delete
                    </span>
                    <div className='absolute hidden group-hover:block top-12 text-sm left-0 bg text-nowrap bg-black/80  px-3 py-2 rounded-lg text-white'>
                      <p>Delete Watchlist</p>
                    </div>
                  </div>
                  <div className='group cursor-pointer rounded-full relative flex justify-center'>
                    <span class="material-symbols-rounded bg-black/30 text-[#fff] p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all hover:scale-[1.1] hover:shadow-lg">
                      more_horiz
                    </span>
                    <div className='absolute hidden group-hover:block top-12 text-sm left-0 bg text-nowrap bg-black/80  px-3 py-2 rounded-lg text-white'>
                      <p>Add Movies</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
            }
        </div>
      </div>
    </main>
  )
}

export default Watchlist