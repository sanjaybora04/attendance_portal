import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Student from "./student"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Student />}></Route>
            </Routes>
        </Router>
    )
}

export default App