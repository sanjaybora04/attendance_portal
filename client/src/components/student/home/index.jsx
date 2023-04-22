import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import api from '/src/api'
import Subject from './subject'

const Home = () => {
    const subjects = useSelector(state => state.profile.subjects)
    const [attendance,setAttendance] = useState(null)
    const overallAttendance = ()=>{
        api.post('/student/stats')
        .then(response=>{
            setAttendance(response.data.attendance)
        })
    }
    useEffect(()=>{
        overallAttendance()
    },[])

    return (
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                    Subjects
                </h6>
            </div>
            <div className={'block m-2 p-2 rounded-lg text-center '+(attendance>=75?"bg-green-200":"bg-red-200")}>
                OverAll Attendance :- {attendance}%
            </div><hr/>

            {/* Subjects list */}
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto">
                    <thead>
                        <tr className='flex justify-between'>
                            <th className="border-b w-1/4 border-green-600 py-3 px-5 text-center">
                                <p className="block antialiased font-sans text-sm font-bold">
                                    Subject
                                </p>
                            </th>
                            <th className="border-b w-1/4 border-green-600 py-3 px-5 text-center">
                                <p className="block antialiased font-sans text-sm font-bold">
                                    Teacher
                                </p>
                            </th>
                            <th className="border-b w-1/4 border-green-600 py-3 px-5 text-center">
                                <p className="block antialiased font-sans text-sm font-bold">
                                    Attendance
                                </p>
                            </th>
                            <th className="border-b w-1/4 border-green-600 py-3 px-5 text-center">
                                <p className="block antialiased font-sans text-sm font-bold ">
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.list.map(subject => {
                            return <Subject subject={subject} live={subjects.live}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Home