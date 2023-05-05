import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Loby from './Loby.js';
import Game from './Game.js';

function App() {

  return (
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Home/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
        <Route path='sign-up' element={<SignUp/>}/>
        <Route path='loby' element={<Loby/>}/>
        <Route path='game' element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
