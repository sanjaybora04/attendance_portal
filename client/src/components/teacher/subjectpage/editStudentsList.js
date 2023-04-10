import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {getSubjects} from '../redux/subjectsReducer'
import {getStudents} from '../redux/studentsReducer'
const backendurl = require('../../../config').backend.url


const AddStudents = (props) => {
    const dispatch = useDispatch()
    const { subject } = props
    const [students, setStudents] = useState([])
    const [addedStudents, setAddedStudents] = useState([]);
// TODO: sync checklist with addedStudents

    const getstudents = () => {
        fetch(backendurl+'/teacher/getClassStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("authtoken")
            },
            body: JSON.stringify({
                class: subject.class
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log(data)
            setStudents(data)
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    
    const handleCheckboxClick = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setAddedStudents([...addedStudents, value]);
        } else {
            setAddedStudents(addedStudents.filter((val) => val !== value));
          }
    }

    const updateStudents = ()=>{
        fetch(backendurl+'/teacher/updateStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("authtoken")
            },
            body: JSON.stringify({
                subject_id: subject._id,
                students: addedStudents
            })
        }).then((response) => response.json())
            .then((data) => {
                dispatch(getSubjects())
                dispatch(getStudents(subject._id))
                console.log(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        
        useEffect(() => {
            getstudents()
        }, [])
    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#checklistModal"
            >
                Edit Students List
            </button>
            {/* Modal */}
            <div
                className="modal fade"
                id="checklistModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="checklistModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="checklistModalLabel">
                                Students List
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {students.map((student) => {
                                    return <div key={student._id} className="form-group">
                                        <label htmlFor={student._id}>{student.email}</label>
                                        <input
                                            type="checkbox"
                                            id={student._id}
                                            name={student._id}
                                            value={student._id}
                                            checked={addedStudents.includes(student._id)}
                                            onChange={handleCheckboxClick}
                                        />
                                    </div>
                                })}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={updateStudents}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddStudents