import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getSubjects } from "../redux/subjectsReducer";
const backendurl = require('../../../config').backend.url

const SubjectItem = (props) => {
  const dispatch = useDispatch()
  const { subject } = props;

  const deleteSubject = (e) => {
    e.preventDefault()
    fetch(backendurl+'/teacher/deleteSubject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem("authtoken")
      },
      body: JSON.stringify({
        subject_id: subject._id,
      })
    }).then((response) => response.json())
      .then((data) => {
        dispatch(getSubjects())
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const takeAttendance = (e) => {
    e.preventDefault()
    fetch('http://192.168.1.11:5000/teacher/takeAttendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem("authtoken")
      },
      body: JSON.stringify({
        subject_id: subject._id,
      })
    }).then((response) => response.json())
      .then((data) => {
        alert(data.msg)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <li className="list-group-item">
      <Link to="/subject" state={{ subject }}>
        <div className="d-flex justify-content-between align-items-center">
          <span>{subject.name}</span>
          <span>{subject.class}</span>
          <button type="button" className="btn btn-primary btn-sm" onClick={(e) => { takeAttendance(e) }}>Take Attendance</button>
          <button type="button" className="btn btn-danger btn-sm" onClick={(e) => { deleteSubject(e) }}><i className='bi bi-trash'></i></button>
        </div>
      </Link>
    </li>

  )
}

export default SubjectItem