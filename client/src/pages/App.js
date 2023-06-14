import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import Home from "./Home.js";
import Loby from "./Loby.js";
import Game from "./Game.js";
import Edit from "./Edit.js";
import Admin from "./Admin.js";
import Verification from "./Verification.js";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Home />} />
        <Route path="/sign-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/loby" element={<Loby />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
