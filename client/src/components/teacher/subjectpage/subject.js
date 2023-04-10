import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import AddStudents from './editStudentsList';
import { getStudents } from '../redux/studentsReducer';

const SubjectItem = () => {
  const location = useLocation()
  const { subject } = location.state
  const students = useSelector((state) => state.students.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudents(subject._id))
  }, [])
  return (
    <div>
      <AddStudents subject={subject} />
      {students.map((student) => {
        return <li className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <span>{student.email}</span>
            <span>{student.class}</span>
          </div>
        </li>
      })}
    </div>
  )
}

export default SubjectItem