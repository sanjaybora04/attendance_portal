import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Signin from "./signin"
import Signup from './signup'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <Router>
            <div className="bg-blue-50 h-screen">
            <Routes>
                {/* <Route path="*" element={<Navigate to="/" />}/> */}
                <Route exact path='/' element={<Signin/>}></Route>
                <Route exact path='/signup' element={<Signup />}></Route>
            </Routes>
            </div>
            <ToastContainer/>
        </Router>
    )
}

export default App