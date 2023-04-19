import { useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import api from '/src/api'
import Webcam from 'react-webcam'

const MarkAttendance = ({ subject,live }) => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [cam, setCam] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Take picture
        capture()
        navigator.geolocation.getCurrentPosition(
            position => {
                api.post('/student/markAttendance', { 
                    subject_id:subject._id, 
                    image,
                    location:{
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude,
                        accuracy:position.coords.accuracy
                    }
                })
                .then(()=>setCam(false))
            },
            error => console.error(error)
          );
    };

    const capture = () => {
        const imgBuffer = webcamRef.current.getScreenshot();
        setImage(imgBuffer)
    };
    return (
        <div className="block">
            <button className={"font-medium rounded-2xl text-lg px-4 py-1 text-center " + (live.includes(subject._id) ?"bg-green-500 hover:bg-green-600": "bg-gray-300")}
                onClick={() => setCam(!cam)}
            >
                ✋
            </button>
            {cam&& live.includes(subject._id) &&
                <div className='absolute mt-2 w-80 h-[410px] bg-green-50 top-44 left-[calc(50%-160px)] md:ml-44 rounded-lg shadow-md'>
                    <div className="flex justify-center">
                        <h5 className="pt-2">
                            Upload image for Attendance
                        </h5>
                        <button className="absolute right-2 top-2 px-2 bg-red-600 text-white rounded-md"
                        onClick={()=>setCam(false)}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <hr/>
                    <div className="">
                        <Webcam className="w-80 h-80 px-2"
                            audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
                    </div>
                    <div className="w-full absolute bottom-2">
                        <hr/>
                        <div className='flex justify-around py-3'>
                        <button className="p-1 rounded-lg bg-red-600 text-white hover:bg-red-800" onClick={()=>setCam(false)}>
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

const Home = () => {
    const subjects = useSelector(state => state.profile.subjects)

    return (
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                    Subjects
                </h6>
            </div>
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto">
                    <thead>
                        <tr className='flex justify-between'>
                            <th className="border-b w-1/5 border-green-600 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-sm font-bold">
                                    Subjects
                                </p>
                            </th>
                            <th className="border-b w-1/5 border-green-600 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-sm font-bold">
                                    Teacher
                                </p>
                            </th>
                            <th className="border-b w-1/5 border-green-600 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-sm font-bold">
                                    Status
                                </p>
                            </th>
                            <th className="border-b w-2/5 border-green-600 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-sm font-bold ">
                                    Attendance
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.list.map(subject => {
                            return <tr className='flex justify-between' key={subject._id}>
                                <td className="py-3 px-5 w-1/5 border-b">
                                    <p className="block antialiased font-sans text-sm leading-normal font-semibold">
                                        {subject.name}
                                    </p>
                                </td>
                                <td className="py-3 px-5 w-1/5 border-b">
                                    <p className="block antialiased font-sans text-sm font-semibold">
                                        {subject.teacher_name}
                                    </p>
                                </td>
                                <td className="py-3 px-5 w-1/5 border-b">
                                    <div className="inline-block font-sans uppercase rounded-lg bg-green-500 text-white bg-opacity-75 py-0.5 text-[11px] font-medium">
                                        {subjects.live.includes(subject._id) && <div className="px-2 mt-px">Live</div>}
                                    </div>
                                </td>
                                <td className="py-3 px-5 w-2/5 border-b">
                                    <MarkAttendance subject={subject} live={subjects.live} />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Home