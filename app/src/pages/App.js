import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import LogIn from './LogIn.js';
import Home from './Home.js';

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Home/>}/>
        <Route path='login' element={<LogIn/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
