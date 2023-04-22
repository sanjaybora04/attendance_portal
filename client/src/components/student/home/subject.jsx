import { useRef, useState, useEffect } from 'react';
import api from '/src/api'
import Webcam from 'react-webcam'

const MarkAttendance = ({ subject, live }) => {
    const webcamRef = useRef(null);
    const [cam, setCam] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault();

        // Take picture
        const image = await webcamRef.current.getScreenshot()
        
        navigator.geolocation.getCurrentPosition(
            position => {
                api.post('/student/markAttendance', {
                    subject_id: subject._id,
                    image,
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    }
                })
                    .then(() => setCam(false))
            },
            error => {
                console.log(error)
                alert("Please grant location access")
            }
        );
    };
    
    return (
        <div className="block">
            <button className={"font-medium rounded-2xl text-lg px-4 py-1 text-center " + (live.includes(subject._id) ? "bg-green-500 hover:bg-green-600" : "bg-gray-400")}
                onClick={() => setCam(!cam)}
            >
                ✋
            </button>
            {cam && live.includes(subject._id) &&
                <div className='absolute mt-2 w-80 h-[410px] bg-green-50 top-44 left-[calc(50%-160px)] md:ml-44 rounded-lg shadow-md'>
                    <div className="flex justify-center">
                        <h5 className="pt-2">
                            Upload image for Attendance
                        </h5>
                        <button className="absolute right-2 top-2 px-2 bg-red-600 text-white rounded-md"
                            onClick={() => setCam(false)}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <hr />
                    <div className="">
                        <Webcam className="w-80 h-80 px-2"
                            audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
                    </div>
                    <div className="w-full absolute bottom-2">
                        <hr />
                        <div className='flex justify-around py-3'>
                            <button className="p-1 rounded-lg bg-red-600 text-white hover:bg-red-800" onClick={() => setCam(false)}>
                                Cancle
                            </button>
                            <button className="p-1 rounded-lg bg-green-600 text-white hover:bg-green-800" onClick={handleSubmit}>
                                MarkAttendance
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const Subject = ({subject, live}) => {
    const [attendance, setAttendance] = useState(null)
    const overallAttendance = () => {
        api.post('/student/stats',{subject:subject._id})
            .then(response => {
                setAttendance(response.data.attendance)
            })
    }
    useEffect(() => {
        overallAttendance()
    }, [])

    return (
        <tr className='flex justify-between' key={subject._id}>
            <td className="py-3 px-5 w-1/4 border-b text-center">
                <p className="block antialiased text-sm">
                    {subject.name}
                </p>
            </td>
            <td className="py-3 px-5 w-1/4 border-b text-center">
                <p className="block antialiased text-sm">
                    {subject.teacher_name}
                </p>
            </td>
            <td className="py-3 px-5 w-1/4 border-b text-center">
                <div className={"inline-block font-sans rounded-lg text-sm "+(attendance>=75?"bg-green-200":"bg-red-200")}>
                    {attendance}%
                </div>
            </td>
            <td className="py-3 px-5 w-1/4 border-b text-center">
                <MarkAttendance subject={subject} live={live} />
            </td>
        </tr>
    )
}

export default Subject