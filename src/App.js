import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy';
import LoginFinal from './components/Login.js';
import RegisterFinal from './components/Register.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.js';
import About from './pages/About.js';
import Settings from './pages/Settings.js';

function App() {
    const [page, setpage] = useState(false);
    const togglepage = () => {
      setpage((prev) => !prev);
    }

    return (
    <CssVarsProvider>
            <Router>
                <Routes>
                    <Route path='/login' element={<LoginFinal togglepage={togglepage} />} />
                    <Route path='/register' element={<RegisterFinal togglepage={togglepage} />} />
                    <Route path='/user/home' element={<Home />} />
                    <Route path='/user/about' element={<About />} />
                    <Route path='/user/settings' element={<Settings />} />
                    <Route path='*' element={<LoginFinal togglepage={togglepage} />} />
                </Routes>
            </Router>
    </CssVarsProvider>
  );
}

export default App;
