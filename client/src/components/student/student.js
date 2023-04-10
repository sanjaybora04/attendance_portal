import { useEffect, useState } from "react";
import UpdateProfile from "./updateProfile";
import MarkAttendance from "./markAttendance";
const backendurl = require('../../config').backend.url

const Student = () => {
    const [subjects,setSubjects] = useState([])

    const getLiveClasses = ()=>{
        fetch(backendurl+'/student/getLiveClasses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authtoken': localStorage.getItem("authtoken")
          }
        }).then((response) => response.json())
          .then((data) => {
            console.log(data)
            setSubjects(data)
          })
          .catch((err) => {
            console.log(err.message);
          });
    }

    useEffect(()=>{
        getLiveClasses()
    },[])
    return (
        <div>
            <UpdateProfile />
            <button typ="button" className="btn btn-primary brn-sm" onClick={()=>{localStorage.setItem('authtoken','');window.location.href='/'}}>Log Out</button>
            {subjects.map((subject) => {
                return <li key = {subject._id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{subject.name}</span>
                    <span>{subject.class}</span>
                    <MarkAttendance subject_id={subject._id}/>
                  </div>
              </li>
            })}
        </div>
    )
}

export default Student