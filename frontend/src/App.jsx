import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import { useAuthContext } from './context/AuthContext.jsx'

function App() {
	const {authUser}   = useAuthContext()

  return (
    <>
      <Router>
          <Routes>
            <Route exact path='/'         element={<Home/>}   />
            <Route exact path='/login'    element={<Login/>}  />
            <Route exact path='/signup'   element={<Signup/>} />
          </Routes>
      </Router>
      <ToastContainer />
    </>
  )
};

export default App;