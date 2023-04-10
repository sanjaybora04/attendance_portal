import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Login from "./login"
import Signup from './signup'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Login/>}></Route>
                <Route exact path='/signup' element={<Signup />}></Route>
            </Routes>
        </Router>
    )
}

export default App