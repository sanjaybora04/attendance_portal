import React, { useState, useRef, useEffect } from 'react'
import Webcam from 'react-webcam'
import AvatarEditor from 'react-avatar-editor'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './redux/profileReducer';
import api from '/src/api'


//Webcam component
const EditImage = ({ image, setImage }) => {
    const webcamRef = useRef(null);
    const [cam, setCam] = useState(false)
    const [editor, setEditor] = useState(false)

    const capture = () => {
        const imgBuffer = webcamRef.current.getScreenshot();
        setImage(imgBuffer)
        setCam(false)
        setEditor(true)
    };

    return (
        <div className="m-3 relative">
            <button className='relative flex p-2 pr-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700'
                onClick={() => setCam(!cam)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 cursor-pointer">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                </svg>
                <p className='px-1 text-sm'>Edit</p>
            </button>
            {editor &&
                    <AvatarEditorComponent image={image} setImage={setImage} closeEditor={e => setEditor(false)} />
            }
            {cam &&
                <div className='absolute mt-2 w-80 h-[410px] bg-green-50 -left-28 rounded-lg shadow-md'>
                    <div className="flex justify-center">
                        <h5 className="pt-2">
                            Update Profile Image
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
                            <button className="p-1 rounded-lg bg-green-600 text-white hover:bg-green-800" onClick={() => { capture() }}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
// Avatar Editor
// BUG: Device->Android, cannot submit same imagefile again
const AvatarEditorComponent = ({ image, setImage, closeEditor }) => {
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const editorRef = useRef();

    const handleSave = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            const dataUrl = canvas.toDataURL();
            closeEditor()
            setImage(dataUrl);
        }
    };

    return (
        <div className="-left-28 absolute">
            <div className='flex flex-col bg-gray-400 p-2 rounded-lg border'>
                <AvatarEditor
                    ref={editorRef}
                    image={image}
                    width={190}
                    height={190}
                    border={50}
                    borderRadius={125}
                    color={[255, 255, 255, 0.6]}
                    scale={scale}
                    rotate={rotate}
                />
                <div className='flex justify-center p-2'>
                    <label htmlFor="scale">Scale:</label>
                    <input
                        type="range"
                        id="scale"
                        name="scale"
                        min="1"
                        max="2"
                        step="0.01"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                    />
                </div>
                <div className='flex justify-center p-2'>
                    <label htmlFor="rotate">Rotate:</label>
                    <input
                        type="range"
                        id="rotate"
                        name="rotate"
                        min="0"
                        max="360"
                        step="1"
                        value={rotate}
                        onChange={(e) => setRotate(parseInt(e.target.value))}
                    />
                </div>
                <button onClick={handleSave} className='bg-green-200 rounded-lg'>Save</button>
            </div>
        </div>
    );
};



const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile)

    const [name, setName] = useState(profile.name)
    const [image, setImage] = useState(profile.image)

    useEffect(() => {
        setName(profile.name)
        setImage(profile.image)
    }, [profile])

    const handleSubmit = (e) => {
        e.preventDefault()

        api.post('/teacher/updateProfile', { name, image })
            .then(response => {
                dispatch(getProfile())
            })
    }

    return (
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mt-2">

            {/* Profile image section */}
            <div className='flex'>
                <img
                    className="w-24 h-24 rounded-full mx-4 overflow-hidden shadow-lg -mt-6 mb-4 mr-1"
                    src={image}
                    alt=''
                />
                <EditImage image={image} setImage={setImage} />
            </div>

            <div className='grid grid-cols-2 gap-2 p-4'>
                <div className='col-span-2 w-full'>
                    <p className='capitalize'>Name</p>
                    <input type='text' placeholder='Enter Name'
                        value={name}
                        onChange={event => setName(event.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2' />
                </div>
                <div className='col-span-6 w-full flex justify-center mt-5'>
                    <button className='font-medium rounded-xl text-lg px-4 py-1 text-center text-white bg-green-500 hover:bg-green-600'
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Profile