import React from 'react'
import { Link } from 'react-router-dom'
import AddWatchlist from './AddWatchlist'
import { useSelector, useDispatch } from 'react-redux'
import { removeWatchlist } from '../features/watchlist/watchlistSlice'
import { useState, useEffect } from 'react'
import { loadWatchlist } from '../features/watchlist/watchlistActions'
import { movieList } from '../features/movies/moviesActions'
import { removeMovie } from '../features/movies/moviesSlice'
import { useNavigate } from 'react-router-dom'

function Watchlist() {

  let [openWatchlist, setOpenWatchlist] = useState(false);
  let [watchlistID, setWatchlistID] = useState('');
  let [checkMail, setCheckMail] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setCheckMail(false);
    } else {
      setCheckMail(true);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
      dispatch(loadWatchlist());
      dispatch(movieList());
  },  [dispatch]);

  let openData = (watchlistID) => {
    setOpenWatchlist(true);
    setWatchlistID(watchlistID);
  }

  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const movies = useSelector((state) => state.movies.movies);

  return (
    <main className='pt-10 lg:px-40 px-20 relative'>
      <div className='flex flex-col justify-center items-center gap-10 text-center'>
        <h1 className='font-bold sm:text-5xl text-2xl text-[#023047]'>
          Personal Watchlists
        </h1>
      </div>
      <div>
        <AddWatchlist/>
      </div>
      <div className='mt-10'>
        {
          watchlist.length === 0 ? 
          <div className='flex justify-center font-semibold text-[#023047] text-center'>
            No Personal Watchlists found
          </div>
          :
        <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-4 justify-center'>
          {
            watchlist.map((value) => (
              <div key={value.id} className='flex items-center justify-between p-5 gap-10 rounded-md bg-white border cursor-pointer shadow-md transition-all hover:transition-all'>
                <p className='font-bold max-w-60 overflow-hidden text-ellipsis capitalize'>
                  {value.text}
                </p>
                <div className='space-x-3 flex flex-nowrap'>
                  <div className='group cursor-pointer rounded-full relative flex justify-center' onClick={() => openData(value.watchlistID)}>
                    <span class="material-symbols-rounded bg-black/30 text-[#fff] p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all hover:scale-[1.1] hover:shadow-lg">
                      visibility
                    </span>
                    <div className='absolute hidden group-hover:block top-12 text-sm left-0 bg text-nowrap bg-black/80  px-3 py-2 rounded-lg text-white'>
                      <p>View Watchlist</p>
                    </div>
                  </div>
                  <div className='group cursor-pointer rounded-full relative flex justify-center'>
                    <span class="material-symbols-rounded bg-black/30 text-[#fff] p-2 rounded-full hover:bg-red-600 hover:text-white transition-all hover:scale-[1.1] hover:shadow-lg" onClick={() => dispatch(removeWatchlist(value.id))}>
                      delete
                    </span>
                    <div className='absolute hidden group-hover:block top-12 text-sm left-0 bg text-nowrap bg-black/80  px-3 py-2 rounded-lg text-white'>
                      <p>Delete Watchlist</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
            }
        </div>
        }
      </div>

      {
          openWatchlist && 
          (
            <div className='bg-black/50 absolute w-full h-screen top-0 left-0 flex gap-3 flex-col items-center justify-center'>
              <div className='bg-white p-3 rounded-md sm:w-[30rem] w-[18rem] mx-3'>
                <div>
                  <div className='mt-3 grid gap-2'>
                  {
                      movies.length === 0 ? 
                      <div className='flex justify-center font-semibold text-[#023047]'>
                        No Movies in this Watchlist
                      </div>
                      :
                      movies.map((movie) => (
                        movie.watchlistID == watchlistID ?
                          <div className='flex gap-2 items-center'>
                            <Link to={`/details/${movie.movieID}`} key={movie.movieID} className='w-full'>
                              <div  className='p-4 rounded-md bg-black/30 text-white hover:bg-[#023047] hover:text-white cursor-pointer transition-all'>
                                <div>
                                  <p className='capitalize text-sm font-bold m-0'>{movie.movieTitle} | {movie.movieYear}</p>
                                </div>
                              </div>
                            </Link>
                            <div className='group relative cursor-pointer' onClick={() => dispatch(removeMovie(movie.id))}>
                              <span class="material-symbols-rounded p-3 bg-black/30 rounded-full hover:bg-red-600 text-white">
                                delete
                              </span>
                              <div className='absolute hidden group-hover:block  text-sm -left-20 top-0.5 bg text-nowrap bg-black/50  px-3 py-2 rounded-lg text-white'>
                              <p>Remove</p>
                              </div>
                            </div>
                          </div>
                        :
                        ('')
                      ))
                    }
                    <div className='flex justify-between gap-2'>
                      <div className=' w-full mt-3 py-2 px-4 rounded-md bg-black/30 text-white cursor-pointer text-center hover:bg-red-600 hover:text-white' onClick={() => setOpenWatchlist(false)}>
                            <p className='capitalize text-sm font-bold'>Close</p>
                      </div>
                      <Link to="/" className='w-full'>
                        <div className='mt-3 py-2 px-4 rounded-md bg-black/30 text-white cursor-pointer text-center'>
                              <p className='capitalize text-sm font-bold'>Add Movies/Shows</p>
                        </div>
                      </Link>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          )
        }
    </main>
  )
}

export default Watchlist