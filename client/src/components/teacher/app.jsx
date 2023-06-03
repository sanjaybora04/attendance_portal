import { useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getProfile, getSubjects } from './redux/profileReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './layout';
import Home from './home';
import Profile from './profile'
import Subject from './subject'


const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProfile())
    dispatch(getSubjects())
  },[])
  return (
    <Router>
      <div className="bg-blue-50 h-screen">
        <Layout />
        <div className="p-4 md:ml-80">
          <div className="p-4 mt-14">
            <Routes>
              {/* <Route path="*" element={<Navigate to="/" />}/> */}
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/subject/:subjectId' element={<Subject />}></Route>
              <Route exact path='/profile' element={<Profile />}></Route>
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Router>
  )
}

export default App