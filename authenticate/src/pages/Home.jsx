import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadWatchlist } from '../features/watchlist/watchlistActions';
import { addMovieToWatchlist } from '../features/watchlist/watchlistSlice';
import { useNavigate } from 'react-router-dom';

function Home() {

  let [movie, setMovie] = useState([]);
  let [loading, isLoading] = useState(false);
  let [watchlistLoading, setWatchlistLoading] = useState(false);
  let [data, setData] = useState(true);
  let [movieID, setMovieID] = useState('');
  let [movieTitle, setMovieTitle] = useState('');
  let [movieYear, setMovieYear] = useState('');
  let [openWl, setOpenWl] = useState(false);
  let [query, setQuery] = useState('iron');
  let [message, setMessage] = useState(false);

  let [checkMail, setCheckMail] = useState(false)
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


  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(loadWatchlist());
  },  [dispatch]);

  const watchlist = useSelector((state) => state.watchlist.watchlist);

  useEffect(() => {
    isLoading(true)
    const fetchMovies = async() => {
      try {
        let res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=c556ecbf`);
        let resData = await res.json();
        if (resData.Search) {
          setMovie(resData.Search);
          setData(true); // Data is successfully fetched
        } else {
          setMovie([]);
          setData(false); // No data found
        }
      } catch (error) {
        setData(false); // Error occurred while fetching data
      }finally{
        isLoading(false)
      }
    }
    fetchMovies();
  },[query])

  let onKeyUpFunction = (e) => {
    setQuery(e.target.value);
  }

  let openWatchlist = (movieImdbID) => {
    setMovieID(movieImdbID);

    setOpenWl(true);
  }

  let closeOpenWl = () => {
    setMovieTitle('');
    setOpenWl(false);
  }

  useEffect(() => {
    setWatchlistLoading(true);
    const fetchMovies = async() => {
      try {
        let res = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=c556ecbf`);
        let resData = await res.json();
        
        setMovieTitle(resData.Title);
        setMovieYear(resData.Year)

      } catch (error) {
        console.log('Issue fecthing data');
      }finally{
        setWatchlistLoading(false);
      }
    }
    fetchMovies();
  },[movieID])

  return (
    <>
      <main className='pt-10 lg:px-40 px-20 relative'>
        <div className='flex flex-col gap-3 justify-center items-center'>
          <h1 className='font-bold sm:text-5xl text-2xl text-[#023047]'>
            Search Movies
          </h1>
          <div>
            <label htmlFor="searchbar"></label>
            <div className='sm:w-[30rem] w-[18rem] border border-neutral-400 bg-white rounded-md flex items-center px-3 shadow'>
              <span class="material-symbols-rounded text-neutral-600 p-1 rounded-full">
                search
              </span>
              <input type="search" id='searchbar' className='p-2 outline-none w-full capitalize' onKeyUp={onKeyUpFunction} placeholder='Type Here' />
            </div>
            <div className='mt-2 font-semibold text-[#023047]'>
              {
                data ? (
                  ('')
                ) : (<div>No Movies Found. Check Spelling or specify the movie title.</div>)
              }
            </div>
          </div>
          {
            loading ?
            <div className='justify-center flex mt-10 flex-col gap-4 items-center'>
              <svg aria-hidden="true" role="status" className="inline w-6 h-6 text-[#023047] animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#fff"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              <p className='text-[#023047] font-semibold'>
                Loading Movies, Series, Shows and many more
              </p>
            </div>
          :
          (
            <div className='py-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 sm:justify-center'>
            {
              movie.map((movie) => (
                <Link to={`/details/${movie.imdbID}`} key={movie.imdbID}>
                  <div className='group relative top-0 cursor-pointer transition-all hover:-translate-y-1'>
                      <img src={movie.Poster} alt={movie.Title} className='w-52 h-72 object-cover rounded-md hover:transition-all transition-all group-hover:opacity-40 group-hover:shadow-lg group-hover:shadow-black'/>
                      {/* Movie Details */}
                      <div className='absolute bottom-5 invisible group-hover:visible px-3 *:font-extrabold *:text-[#023047]'>
                        <p className='group text-2xl text-neutral-800 font-bold w-48'>{movie.Title}</p>
                        <p className='group text-sm text-neutral-800 font-bold w-48 capitalize'>{movie.Type} | {movie.Year}</p>
                      </div>
                      {/* Watchlist Icon */}
                      <Link to={`/`}>
                        <div className='group/watchlist absolute right-3 top-3 group-hover:visible flex items-center' onClick={() => openWatchlist(movie.imdbID)}>
                          <span class="material-symbols-rounded text-3xl bg-neutral-800 text-white p-1 rounded-lg">
                            bookmark_add
                          </span>
                          <div className='group-hover/watchlist:visible invisible absolute -left-36 rounded-md bg-black/70 text-white px-3 py-2 text-sm'>
                            Add To Watchlist
                          </div>
                        </div>
                      </Link>
                  </div>
                </Link>
              ))
            }
            </div>
          )
          }
        </div>
        {
          openWl && 
          (
            <div className='bg-black/50 absolute w-full h-screen top-0 left-0 flex gap-3 flex-col items-center justify-center'>
              <div className='bg-white p-3 rounded-md sm:w-[20rem] w-[18rem]'>
                
                {
                  watchlistLoading ? 
                  <div className='justify-center flex my-20 flex-col gap-4 items-center'>
                    <svg aria-hidden="true" role="status" className="inline w-6 h-6 text-[#023047] animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#fff"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    <p className='text-[#023047] font-semibold'>
                      Loading
                    </p>
                  </div>

                  :

                  <div>
                    <div className='flex justify-between items-center'>
                      <p className='font-bold text-[#023047]'>{movieTitle}</p>
                      <button className='text-sm rounded-md bg-red-600 px-3 py-1 text-white' onClick={closeOpenWl}>
                        Cancel
                      </button>
                    </div>
                    <hr className='my-2 border-[#023047]' />
                    <div>
                      <p className='text-[12px] text-neutral-600 font-semibold'>Once selected, the content will get added to watchlist</p>
                      <div className='mt-3 grid gap-2'>
                        {
                          watchlist.map((watchlist) => (
                            <div key={watchlist.id} className='py-2 px-4 rounded-md bg-black/30 text-white hover:bg-[#023047] hover:text-white cursor-pointer transition-all hover:scale-[1.03]' onClick={() => dispatch(addMovieToWatchlist({ watchlistID: watchlist.watchlistID, watchlistName : watchlist.text, movieID: movieID, movieTitle : movieTitle, movieYear : movieYear }))}>
                              <p className='capitalize text-sm font-bold'>{watchlist.text}</p>
                            </div>
                          ))
                        }
                        <Link to="/watchlist">
                          <div className='mt-3 py-2 px-4 rounded-md bg-black/30 text-white cursor-pointer text-center'>
                                <p className='capitalize text-sm font-bold'>Create New Watchlist</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                }
                
              </div>
            </div>
          )
        }
      </main>
    </>
  )
}

export default Home