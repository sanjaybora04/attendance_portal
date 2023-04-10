import { useEffect, useState } from "react";
import NotLoggedIn from './components/notLoggedIn/app'
import Student from './components/student/app'
import Teacher from './components/teacher/app'
const backendurl = require('./config').backend.url

function App() {
  console.log(backendurl)
  const [user,setUser] = useState('')
  const getUser = () => {
    fetch(backendurl+'/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authtoken': localStorage.getItem("authtoken")
          }
        }).then((response) => response.json())
          .then((data) => {
            setUser(data.usertype)
          })
          .catch((err) => {
            console.log(err.message);
          });
  }
  useEffect(()=>{
    getUser()
  })
  
  switch(user){
    case 'student': return <Student/>
    case 'teacher': return <Teacher/>
    default : return <NotLoggedIn/>
  }
}

export default App;