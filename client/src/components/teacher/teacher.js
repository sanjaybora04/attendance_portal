import { useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux'
import { getSubjects } from './redux/subjectsReducer'

import AddSubject from "./subjects/addSubject";
import SubjectItem from './subjects/subjectItem'


const Teacher = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getSubjects())
  },[])
  const subjects = useSelector(state => state.subjects.data)
  return (
    <div>
      <AddSubject />
      <button typ="button" className="btn btn-primary brn-sm" onClick={()=>{localStorage.setItem('authtoken','');window.location.href='/'}}>Log Out</button>
      {subjects.map((subject) => {
        return <SubjectItem subject={subject} />
      })}
    </div>
  )
}

export default Teacher