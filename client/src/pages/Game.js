import React from "react";
import "../styles/app/game.css";
import "../styles/app/loby.css";
import { useLocation } from 'react-router-dom';

function Game(porps) {
  const { state } = useLocation();
  const { value } = state || {};

  return (
    <main className="loby">
      <div className="mainContainer">
        <div>{console.log(value)}</div>
      </div>
    </main>
  );
}

export default Game;