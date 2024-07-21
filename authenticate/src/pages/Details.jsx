import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadWatchlist } from '../features/watchlist/watchlistActions';
import { Link } from 'react-router-dom';
import { addMovieToWatchlist } from '../features/watchlist/watchlistSlice';

function Details() {

  let [movie, setMovie] = useState([]);
  let imdbID = useParams();
  let [loading, setLoading] = useState(false);
  let [openWl, setOpenWl] = useState(false);
  let [watchlistLoading, setWatchlistLoading] = useState(false);
  
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWatchlist());
  },  [dispatch]);

  useEffect(() => {

    setLoading(true)

    let fetchMovie = async () => {
      try{
        let res = await fetch(`https://www.omdbapi.com/?i=${imdbID.imdbID}&apikey=c556ecbf`);
        let data = await res.json();
        console.log(data);
        setMovie(data);
      }catch(error){
        throw error;
      }finally{
        setLoading(false)
      }
    } 

    fetchMovie();
  }, [])
  

  let randomImage = movie.Poster;

  const watchlist = useSelector((state) => state.watchlist.watchlist);

  return (
    <>
      <main className='bg-white'>
        <div className=' pt-10 md:px-40 px-10'>
          {
              loading ?
                <div className='justify-center flex mt-10 flex-col gap-4 items-center'>
                  <svg aria-hidden="true" role="status" className="inline w-6 h-6 text-[#023047] animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#fff"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  <p className='text-[#023047] font-semibold'>
                    Loading
                  </p>
                </div>
              :
              <div className='flex md:flex-row flex-col gap-10 items-center'>
                <img src={movie.Poster} alt="" className='md:w-72 w-52  rounded-lg' />
                <div>
                  <p className='lg:text-5xl text-3xl text-neutral-800 font-extrabold mb-10'>{movie.Title}</p>
                  <p className='lg:text-xl text-lg font-bold text-neutral-800 mb-5'>{movie.Plot}</p>
                  <div className='flex gap-5 *:font-bold md:text-neutral-700 text-neutral-800'>
                    <p>IMBDb {movie.imdbRating}</p>
                    <p>{movie.Runtime}</p>
                    <p>{movie.Released}</p>
                  </div>
                  <div className='mt-10 flex gap-5'>
                    {/* Watchlist Icon */}
                    <div className='group cursor-pointer rounded-full relative flex justify-center' onClick={() => setOpenWl(true)}>
                      <span class="material-symbols-rounded text-[30px] bg-black/30 text-[#fff] p-3 rounded-full hover:bg-[#023047] hover:text-white transition-all hover:scale-[1.1] hover:shadow-lg">
                        bookmark_add
                      </span>
                      <div className='absolute hidden group-hover:block top-16 left-0 bg text-nowrap bg-[#023047] px-3 py-2 rounded-lg text-white'>
                        <p>Add To Watchlist</p>
                      </div>
                    </div>

                    {/* Like Icon */}
                    <div className='group cursor-pointer rounded-full relative flex justify-center'>
                      <span class="material-symbols-rounded text-[30px] bg-black/30 text-[#fff] p-3 rounded-full hover:bg-[#023047] hover:text-white transition-all hover:scale-[1.1] hover:shadow-lg">
                        thumb_up
                      </span>
                      <div className='absolute hidden group-hover:block top-16 left-0 bg text-nowrap bg-[#023047] px-3 py-2 rounded-lg text-white'>
                        <p>Like</p>
                      </div>
                    </div>

                    {/* UnLike Icon */}
                    <div className='group cursor-pointer rounded-full relative flex justify-center'>
                      <span class="material-symbols-rounded text-[30px] bg-black/30 text-[#fff] p-3 rounded-full hover:bg-[#023047] hover:text-white transition-all hover:scale-[1.1] hover:shadow-lg">
                        thumb_down
                      </span>
                      <div className='absolute hidden group-hover:block top-16 left-0 bg text-nowrap bg-[#023047] px-3 py-2 rounded-lg text-white'>
                        <p>Unlike</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                      <p className='font-bold text-[#023047]'>{movie.Title}</p>
                      <button className='text-sm rounded-md bg-red-600 px-3 py-1 text-white' onClick={() => setOpenWl(false)}>
                        Cancel
                      </button>
                    </div>
                    <hr className='my-2 border-[#023047]' />
                    <div>
                      {
                        watchlist.length > 0 ? 
                        <p className='text-[12px] text-neutral-600 font-semibold'>Once selected, the content will get added to watchlist</p>
                        : ('')
                      }
                      <div className='mt-3 grid gap-2'>
                        {
                            watchlist.length === 0 ? 
                            <div className='flex justify-center font-semibold text-[#023047]'>
                              No Personal Watchlists found
                            </div>
                            :
                          watchlist.map((watchlist) => (
                            <div key={watchlist.id} className='py-2 px-4 rounded-md bg-black/30 text-white hover:bg-[#023047] hover:text-white cursor-pointer transition-all hover:scale-[1.03]' onClick={() => dispatch(addMovieToWatchlist({ watchlistID: watchlist.watchlistID, watchlistName : watchlist.text, movieID: movie.imdbID, movieTitle : movie.Title, movieYear : movie.Year }))}>
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

export default Details