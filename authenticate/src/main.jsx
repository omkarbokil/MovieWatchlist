import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Layout from './components/Layout.jsx';
import Watchlist from './pages/Watchlist.jsx';
import Account from './pages/Account.jsx';
import Details from './pages/Details.jsx';
import { Provider } from 'react-redux';
import store from './app/store';
import Login from './pages/Login.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="login" element={<Login />}></Route>
    <Route path="/" element={<Layout/>}>
      <Route path='/' element={<Home />} />
      <Route path='watchlist' element={<Watchlist />} />
      <Route path='account' element={<Account />} />
      <Route path='details/:imdbID' element={<Details />} />
    </Route>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
