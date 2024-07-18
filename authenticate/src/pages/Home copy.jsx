import React, { useRef } from 'react'
import { useEffect, useState } from 'react';

function Home() {

  let [movie, setMovie] = useState([]);
  let [search, setSearch] = useState(false);
  let searchData = useRef();
  let searchValue;

  useEffect(() => {
    const fetchMovies = async() => {
      try {
        let res = await fetch('http://www.omdbapi.com/?s=asdfsddfsdf&apikey=c556ecbf');
        let data = await res.json();
        console.log(data.Search);
        setMovie(data.Search);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    fetchMovies();
  },[search])

  let onKeyUpFunction = () => {
    searchValue = searchData.current.value;
    setSearch(true);
  }


  return (
    <>
      <main className='container pt-10 px-40'>
        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-6xl text-neutral-700'>
            Search Movies
          </h1>
          <div>
            <label htmlFor="searchbar"></label>
            <div className='w-[30rem] border border-neutral-400 rounded-md flex items-center px-3 shadow'>
              <span class="material-symbols-rounded text-neutral-600 p-1 rounded-full">
                search
              </span>
              <input type="search" id='searchbar' className='p-2 outline-none w-full' onKeyUp={onKeyUpFunction} ref={searchData} />
            </div>
          </div>
          <div className='py-5 grid grid-cols-5 gap-4 justify-center'>
            {
              movie.map((movie) => (
                  <>
                    <div className='group relative top-0 cursor-pointer transition-all hover:-translate-y-1'>
                        <img src={movie.Poster} alt={movie.Title} className='w-52 h-72 object-cover rounded-md hover:transition-all transition-all group-hover:opacity-40 group-hover:shadow-lg group-hover:shadow-black'/>
                        {/* Movie Details */}
                        <div className='absolute bottom-5 invisible group-hover:visible px-3'>
                          <p className='group text-2xl text-neutral-800 font-bold w-48'>{movie.Title}</p>
                          <p className='group text-sm text-neutral-800 font-bold w-48 capitalize'>{movie.Type} | {movie.Year}</p>
                        </div>
                        {/* Watchlist Icon */}
                        <div className='group/watchlist absolute right-8 top-3 invisible group-hover:visible flex items-center'>
                          <span class="material-symbols-rounded text-3xl bg-neutral-800 text-white p-1 rounded-lg">
                            bookmark_add
                          </span>
                          <div className='group-hover/watchlist:visible invisible absolute -left-36 rounded-md bg-black/70 text-white px-3 py-2 text-sm'>
                            Add To Watchlist
                          </div>
                        </div>
                    </div>
                  </>
              ))
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default Home