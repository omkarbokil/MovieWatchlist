import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {

  let [movie, setMovie] = useState([]);
  let [data, setData] = useState(true);
  let [query, setQuery] = useState('iron');

  useEffect(() => {
    const fetchMovies = async() => {
      try {
        let res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=c556ecbf`);
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
      }
    }
    fetchMovies();
  },[query])

  let onKeyUpFunction = (e) => {
    setQuery(e.target.value);
  }

  let okay = () => {
    console.log('kshdgvbfisdbf');
  }

  return (
    <>
      <main className='pt-10 lg:px-40 px-20'>
        <div className='flex flex-col gap-3 justify-center items-center'>
          <h1 className='font-bold sm:text-5xl text-3xl text-[#023047]'>
            Search Movies
          </h1>
          <div>
            <label htmlFor="searchbar"></label>
            <div className='sm:w-[30rem] w-[20rem] border border-neutral-400 bg-white rounded-md flex items-center px-3 shadow'>
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
          <div className='py-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 sm:justify-center'>
          {
            data ?
            (
                movie.map((movie) => (
                  <Link to={`/details/${movie.imdbID}`} key={movie.imdbID}>
                    <div className='group relative top-0 cursor-pointer transition-all hover:-translate-y-1'>
                        <img src={movie.Poster} alt={movie.Title} className='w-52 h-72 object-cover rounded-md hover:transition-all transition-all group-hover:opacity-40 group-hover:shadow-lg group-hover:shadow-black'/>
                        {/* Movie Details */}
                        <div className='absolute bottom-5 invisible group-hover:visible px-3 *:font-extrabold *:text-white'>
                          <p className='group text-2xl text-neutral-800 font-bold w-48'>{movie.Title}</p>
                          <p className='group text-sm text-neutral-800 font-bold w-48 capitalize'>{movie.Type} | {movie.Year}</p>
                        </div>
                        {/* Watchlist Icon */}
                        <Link to={`/`}>
                          <div className='group/watchlist absolute right-3 top-3 invisible group-hover:visible flex items-center' onClick={okay}>
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
              ) : ('')
          }
          </div>
        </div>
      </main>
    </>
  )
}

export default Home