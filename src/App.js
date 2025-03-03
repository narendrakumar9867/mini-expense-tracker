import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy';
import Register from './components/Register';
import LoginFinal from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

    return (
    <CssVarsProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/user/register' element={
          user ? (
            alert("Yot can't register if you are logged in!"),
            <Navigate to="/user/home" />
          ) : (
            <Register />
          )
         } />
        <Route path="/user/login" element={
            user ? (
              alert("You can't login if you are logged in!"),
              <Navigate to="/user/home" />
            ) : (
              <LoginFinal />
            )
          } />
        <Route path='/user/home' element={ <Home />}/>
      </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
