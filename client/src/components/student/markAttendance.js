import { useState,useRef } from "react";
import Webcam from 'react-webcam'
const backendurl = require('../../config').backend.url


const MarkAttendance = ({subject_id}) => {
    const [image, setImage] = useState(null);
    const webcamRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Take picture
        capture()

        fetch(backendurl+'/student/markAttendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("authtoken")
            },
            body: JSON.stringify({
                subject_id: subject_id,
                image: image
            })
        }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                alert(data.msg)
            })
            .catch((err) => {
                console.log(err.message);
            });

    };

    const capture = () => {
        const imgBuffer = webcamRef.current.getScreenshot();
        setImage(imgBuffer)
    };

    return (
        <div>
            <div className="container">
                <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#markAttendance"
                >
                    MarkAttendance
                </button>
            </div>
            {/* Floating Form Modal */}
            <div
                className="modal fade"
                id="markAttendance"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Upload image for Attendance
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
                            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
                                MarkAttendance
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkAttendance