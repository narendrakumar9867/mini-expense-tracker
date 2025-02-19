import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

    return (
    <CssVarsProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/user/register' element={ <Register />}></Route>
        <Route path='/user/login' element={ <Login />}></Route>
        <Route path='/user/home' element={ <Home />}></Route>
      </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
