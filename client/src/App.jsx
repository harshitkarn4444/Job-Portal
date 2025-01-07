import React from "react";
import { Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from './pages/Signin/Signin';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { UserProvider } from './context/UserContext';

const App = () =>{
  return (
    <>
    <UserProvider>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </UserProvider>
    </>
  )


}

export default App