import { useEffect, useState } from "react";
import NotLoggedIn from './components/notLoggedIn/app'
import Student from './components/student/index'
import Teacher from './components/teacher/index'
import api from '/src/api'

function App() {
  const [user, setUser] = useState('')
  const getUser = () => {
    api.post('/getuser')
      .then(response=> {
        setUser(response.data.usertype)
    })
  }
  useEffect(() => {
    getUser()
  })

  switch (user) {
    case 'student': return <Student />
    case 'teacher': return <Teacher />
    default: return <NotLoggedIn />
  }
}

export default App;