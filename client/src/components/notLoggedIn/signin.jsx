import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '/src/api'


const Signin = () => {
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('');

  const getOtp = (e) => {
    e.preventDefault()
    api.post('/getotp', { email })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    api.post('/' + userType + '/login', { email, otp, password })
      .then(response => {
        if(response.data.authtoken){
          localStorage.setItem('authtoken',response.data.authtoken)
          window.location.href='/'
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
              Sign in to your account
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
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signin