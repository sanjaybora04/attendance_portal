import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { getSubject } from './redux/subjectReducer'
import api from '/src/api'

const Subject = () => {
    const match = useMatch('/subject/:subjectId');
    const subject_id = match?.params?.subjectId || '';
    const dispatch = useDispatch()

    const subject = useSelector(state => state.subject)
    const [editStudents, setEditStudents] = useState(false)
    const [addedStudents, setAddedStudents] = useState([])

    const getList = () => {
        api.post('teacher/attendancelist',{subject_id})
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', subject.subject.name+'.csv');
                document.body.appendChild(link);
                link.click();
            })
    }

    const handleCheckboxClick = (event) => {
        const { value, checked } = event.target;
        console.log(checked)
        if (checked) {
            setAddedStudents([...addedStudents, value]);
        } else {
            setAddedStudents(addedStudents.filter((val) => val !== value));
        }
    }

    const updateStudents = (e) => {
        e.preventDefault()

        setEditStudents(false)

        api.post('/teacher/updateStudents', {
            subject_id,
            students: addedStudents
        }).then((response) => {
            dispatch(getSubject(subject_id))
        })
    }

    useEffect(() => {
        setAddedStudents(subject.addedStudents.map(student => student._id))
    }, [subject])

    useEffect(() => {
        dispatch(getSubject(subject_id))
    }, [])

    return (
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                    Students
                </h6>
            </div>
            <div className='grid grid-cols-3'>
                <div></div>
                <div className='block text-center'>
                    <button className='p-1 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-blue-500/40 shadow-lg hover:bg-gradient-to-tr hover:from-blue-900 hover:to-blue-700'
                        onClick={() => { setEditStudents(!editStudents) }}
                    >
                        Edit Student List
                    </button>
                    {editStudents &&
                        <div className='overflow-y-scroll overflow-x-scroll p-3 w-64 max-h-96 left-[calc(50%-128px)] rounded-lg shadow-lg absolute bg-white'>
                            <div className='pb-3'>
                                Student List
                            </div>
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className='flex justify-between'>
                                        <th className="border-b w-1/3 border-green-600 py-3 px-5 text-left">
                                            <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                                                Name
                                            </p>
                                        </th>

                                        <th className="border-b w-1/3 border-green-600 py-3 px-5 text-left">
                                            <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                                                Email
                                            </p>
                                        </th>
                                        <th className="border-b w-1/3 border-green-600 py-3 px-5 text-left">
                                            <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                                            </p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subject.allStudents.map(student => {
                                        return <tr key={student._id} className="flex justify-between">
                                            <td className="border-b w-1/3 py-3 px-5 text-left">
                                                <p className="block antialiased font-sans text-[11px] font-bold">
                                                    {student.name}
                                                </p>
                                            </td>
                                            <td className="border-b w-1/3 py-3 px-5 text-left">
                                                <p className="truncate block antialiased font-sans text-[11px] font-bold">
                                                    {student.email}
                                                </p>
                                            </td>
                                            <td className="border-b w-1/3 py-3 px-5 text-left">
                                                <input
                                                    type="checkbox"
                                                    value={student._id}
                                                    checked={addedStudents.includes(student._id)}
                                                    onChange={handleCheckboxClick}
                                                />
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            <div className='pt-3'>
                                <button className='font-medium rounded-xl text-sm px-4 py-1 text-center text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-200'
                                    onClick={updateStudents}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    }

                </div>
                <div className='block text-right mr-5'>
                    <button className='p-1 rounded-lg bg-green-600 text-white shadow-lg hover:bg-green-700'
                        onClick={() => { getList() }}
                    >
                        Download List
                    </button>
                </div>
            </div>
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto mt-3">
                    <thead>
                        <tr className='flex justify-between'>
                            <th className="border-b w-1/2 border-blue-gray-50 py-3 px-5">
                                <p className="block antialiased font-sans text-sm font-bold uppercase">
                                    Name
                                </p>
                            </th>

                            <th className="border-b w-1/2 border-blue-gray-50 py-3 px-5">
                                <p className="block antialiased font-sans text-sm font-bold uppercase">
                                    Email
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subject.addedStudents.map(student => {
                            return <tr className='flex justify-between'>
                                <td className="py-3 px-5 w-1/2 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-gray-500 font-semibold">
                                        {student.name}
                                    </p>
                                </td>
                                <td className="py-3 px-5 w-1/2 border-b border-blue-gray-50">
                                    <p className="truncate block antialiased font-sans text-sm leading-normal text-gray-500 font-semibold">
                                        {student.email}
                                    </p>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Subject