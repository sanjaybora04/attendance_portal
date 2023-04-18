import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '/src/api'


const Signup = () => {
  const [userType, setUserType] = useState('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')

  const [eno, setEno] = useState('') // Enrollment Number
  const [course, setCourse] = useState('BCA')
  const [semester, setSemester] = useState('I')

  const getOtp = (e) => {
    e.preventDefault()
    console.log(email)
    api.post('/getotp', { email })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/' + userType + '/signup', {
      name,
      email,
      otp,
      password,
      eno,
      course: {
        name: course,
        semester: semester
      }
    }).then(response => {
      if (response.data.authtoken) {
        localStorage.setItem('authtoken', response.data.authtoken)
        window.location.href = '/'
      }
    })
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          {"{College_Name}"}
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Register your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="usertype" className="block text-sm font-medium text-gray-900">Usertype</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  value={userType} onChange={event => setUserType(event.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <div className='flex'>
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                    placeholder="name@college.com"
                    required
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                  />
                  <button className='bg-green-600 text-white rounded-r-lg w-24'
                    onClick={getOtp}
                  >
                    Get Otp
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  OTP
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  placeholder="Enter Otp"
                  required
                  value={otp}
                  onChange={event => setOtp(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </div>

              {/* If usertype is Student */}
              {userType == "student" ? <div className='grid grid-cols-2'>
                <div className='col-span-2'>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                    placeholder="Enter your Enrollment Number"
                    required
                    value={eno}
                    onChange={event => setEno(event.target.value)}
                  />
                </div>
                <div className='m-2'>
                  <p className='capitalize'>Course</p>
                  <select value={course}
                    onChange={event => setCourse(event.target.value)}
                    className='w-full rounded-lg border border-gray-300 bg-gray-300 focus:bg-white p-2'>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                  </select>
                </div>
                <div className='m-2'>
                  <p className='capitalize'>Semester</p>
                  <select value={semester}
                    onChange={event => setSemester(event.target.value)}
                    className='w-full rounded-lg border border-gray-300 bg-gray-300 focus:bg-white p-2'>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="VI">VI</option>
                  </select>
                </div>
              </div> :
                // If usertype is Teacher
                <div>

                </div>}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup