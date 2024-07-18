import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <>
     <nav className='bg-white shadow p-3 text-black flex justify-between items-center font-manrope'>
          <div>
               <h1 className='font-semibold text-xl text-[#023047]'>Movie Watchlist App</h1>
          </div>
          <div>
               <ul className='flex gap-10 *:cursor-pointer *:px-5 *:py-2 *:rounded-md'>
               <NavLink
               to="/"
               className={({ isActive}) =>
               isActive ? "text-[#023047] font-bold" : ""
               }
               >
               Home
               </NavLink>
               <NavLink
               to="/watchlist"
               className={({ isActive}) =>
               isActive ? "text-[#023047] font-bold" : ""
               }
               >
               Watchlist
               </NavLink>
               <NavLink
               to="/account"
               className={({ isActive}) =>
               isActive ? "text-[#023047] font-bold" : ""
               }
               >
               Account
               </NavLink>
               </ul>
          </div>
     </nav>
    </>
  )
}

export default Navigation