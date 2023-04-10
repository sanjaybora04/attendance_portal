import { useState } from "react";
const backendurl = require('../../config').backend.url


const UpdateProfile = () => {
    const [Class, setClass] = useState('');
    const [image, setImage] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Verify that entered file is an image or not

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function (event) {
            const imgBuffer = event.target.result
            fetch(backendurl + '/student/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                },
                body: JSON.stringify({
                    class: Class,
                    image: imgBuffer
                })
            }).then((response) => response.json())
                .then((data) => {
                    alert(data.msg)
                })
                .catch((err) => {
                    console.log(err.message);
                });

        };
        reader.onerror = function (error) {
            alert('Error with image file');
        };


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
                    Update Profile
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
                                Update Profile
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
                                    <label htmlFor="inputClass">Semester</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputClass"
                                        placeholder="Enter Class"
                                        value={Class}
                                        onChange={event => setClass(event.target.value)}
                                    />
                                    <label htmlFor="inputClass">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="inputImage"
                                        onChange={event => setImage(event.target.files[0])}
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
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Include jQuery and Bootstrap JS */}
        </div>
    )
}

export default UpdateProfile