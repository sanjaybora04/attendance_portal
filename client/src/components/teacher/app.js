import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { Provider } from "react-redux"
import store from './redux/store'

import Teacher from './teacher'
import Subject from './subjectpage/subject' 

const App = () => {
    return (
        <Provider store={store}>
        <Router>
            <Routes>
                <Route exact path='/' element={<Teacher/>}></Route>
                <Route exact path='/subject' element={<Subject />}></Route>
            </Routes>
        </Router>
        </Provider>
    )
}

export default App