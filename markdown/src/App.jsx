import { useEffect, useState } from 'react'
import Auth from './Auth'
import Home from './Home'
import Register from './Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { isToken } from './store/tokenSlice'


export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isToken())
  }, [dispatch])




  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
