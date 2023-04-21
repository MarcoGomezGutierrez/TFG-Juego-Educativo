import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Home from './Home.js';

function App() {

  return (
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Home/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
        <Route path='sign-up' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
