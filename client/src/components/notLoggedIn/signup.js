import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const backendurl = require('../../config').backend.url


const Signup = () => {
  const [userType, setUserType] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(backendurl+'/'+userType+"/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((response) => response.json())
      .then((data) => {
        if(data.authtoken){
          localStorage.setItem("authtoken",data.authtoken)
          window.location.href="/"
        }
        else{
          alert(data.msg)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Signup Form</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="usertype">User Type</label>
                  <select className="form-control" id="usertype" name="usertype" value={userType} onChange={event => setUserType(event.target.value)}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={username} 
                    onChange={event => setUsername(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Signup
                </button>
              </form>
            </div>
          </div>
          <Link to={'/'} className='d-flex justify-content-center'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup