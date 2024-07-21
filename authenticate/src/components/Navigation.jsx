import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'

function Navigation() {

     let [open, setOpen] = useState(false);

  return (
    <>
     <nav className='bg-white shadow p-3 text-black font-manrope'>
          <div className='sm:flex justify-between items-center hidden'>
               <Link to='/'>
                    <div>
                         <h1 className='font-semibold text-xl text-[#023047]'>Movie Watchlist</h1>
                    </div>
               </Link>
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
          </div>
          <div class="flex justify-between items-center sm:hidden">
               <Link to='/'>
                    <div>
                         <h1 className='font-semibold text-xl text-[#023047]'>Movie Watchlist</h1>
                    </div>
               </Link>
               <span class="material-symbols-rounded text-[#484848] p-2 border-2 rounded-full hover:bg-black/10 dark:border-neutral-500" role="button"  id="collapsible-menu-open" onClick={() => setOpen(true)}>
                    menu
               </span>
          </div>
          
          <section class={`left-0  w-screen absolute text-white transition-all flex flex-col items-center z-50 ${open ? 'top-0' : '-top-96'}`} id="collapsible-menu">
               <ul class=" gap-5 justify-center bg-[#023047] w-screen flex flex-col flex-wrap items-center p-5">
               <NavLink
                    to="/"
                    className={({ isActive}) =>
                    isActive ? "text-[#023047] font-bold bg-white rounded-md px-8 py-2" : ""
                    }
                    >
                    Home
                    </NavLink>
                    <NavLink
                    to="/watchlist"
                    className={({ isActive}) =>
                    isActive ? "text-[#023047] font-bold bg-white rounded-md px-8 py-2" : ""
                    }
                    >
                    Watchlist
                    </NavLink>
                    <NavLink
                    to="/account"
                    className={({ isActive}) =>
                    isActive ? "text-[#023047] font-bold bg-white rounded-md px-8 py-2" : ""
                    }
                    >
                    Account
                    </NavLink>
               </ul>
               <section class="absolute -bottom-14" id="collapsible-menu-close" onClick={() => setOpen(false)}>
                    <span class="material-symbols-rounded p-2 bg-[#324464] text-white rounded-full" role="button">
                         close
                    </span>
               </section>
          </section>
     </nav>
    </>
  )
}

export default Navigation