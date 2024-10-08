import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route exact path='/'         element={<Home/>}   />
            <Route exact path='/login'    element={<Login/>}  />
            <Route exact path='/signup'   element={<Signup/>} />
          </Routes>
      </Router>
    </>
  )
};

export default App;
