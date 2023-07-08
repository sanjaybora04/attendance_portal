import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getProfile, getMyclasses } from './redux/profileReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './layout';
import Home from './home';
import Profile from './profile'
import Class from './class'
import Signin from './auth/signin';


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
    dispatch(getMyclasses())
  }, [])
  return (
    <Router>
      <Routes>
        <Route exact path='/signin' element={<Signin />}></Route>
        <Route element={<Layout />}>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/class/:classId' element={<Class />}></Route>
          <Route exact path='/profile' element={<Profile />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App