import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSubjects } from "../redux/subjectsReducer";
const backendurl = require('../../../config').backend.url


const AddSubject = () => {
    const dispatch = useDispatch()

    const [subjectname, setSubjectname] = useState('');
    const [Class, setClass] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(backendurl+'/teacher/addSubject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authtoken': localStorage.getItem("authtoken")
          },
          body: JSON.stringify({
            name: subjectname,
            class: Class
          })
        }).then((response) => response.json())
          .then((data) => {
            dispatch(getSubjects())
          })
          .catch((err) => {
            console.log(err.message);
          });
    
      };
    return (
        <div>
            <div className="container">
                <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                >
                    Add Subject
                </button>
            </div>
            {/* Floating Form Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Add New Subject
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
                            {/* Form content goes here */}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="subjectName">Subject Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subjectName"
                                        placeholder="Enter subject name"
                                        value={subjectname} 
                                        onChange={event => setSubjectname(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Class</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputClass"
                                        placeholder="Enter Class"
                                        value={Class} 
                                        onChange={event => setClass(event.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Cancle
                            </button>
                            <button type="button" className="btn btn-primary" data-dismiss='modal' onClick={handleSubmit}>
                                Add Subject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Include jQuery and Bootstrap JS */}
        </div>

    )
}

export default AddSubject