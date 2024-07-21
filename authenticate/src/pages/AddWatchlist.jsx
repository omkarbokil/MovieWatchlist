import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addWatchlist } from '../features/watchlist/watchlistSlice'

function AddWatchlist() {

     let [input, setInput] = useState('');
     const dispatch = useDispatch();
     let [message, setMessage] = useState(false);

     const addWatchlistHandler = (e) => {
          e.preventDefault();
          dispatch(addWatchlist(input))
          setInput('')
          setMessage(true);

          setTimeout(() => {
               setMessage(false)
          }, 5000);
     }


  return (
    <section className='mt-5'>
          <div className='flex justify-center'>
               <form onSubmit={addWatchlistHandler} className='border p-4 bg-white rounded-lg relative flex sm:flex-row flex-col items-center gap-3'>
                    <div className='md:w-[40rem] sm:w-[20rem]'>
                         <input type="text" id="watchlistName" className='border capitalize outline-none border-[#023047] text-sm px-3 rounded-md py-1.5 w-full' placeholder='Enter Watchlist Name' required value={input} onChange={(e) => setInput(e.target.value)} />
                    </div>

                    <div className='text-center'>
                         <button type='submit' className='px-4 py-1 w-full bg-[#023047] text-white rounded-md'>
                              Create
                         </button>
                    </div>

               </form>
          </div>
          {/* Watchlist Message */}
          <div className='flex justify-center mt-3'>
               {
                    message ? 
                    <div className='bg-white/30 px-5 py-2 rounded-md flex items-center gap-3 text-[#023047] font-semibold'>
                         <span class="material-symbols-rounded">
                              task_alt
                         </span>
                         <p>Watchlist Created</p>
                    </div>
                    : ('')
               }
          </div>
    </section>
  )
}

export default AddWatchlist