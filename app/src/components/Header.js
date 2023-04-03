import React, { Component } from "react";
import "../styles/Header.css"
import data from "../other/header.json"

function selectLanguage(language) {
  if (language === 'es-ES') {
    return data.es;
  } else return data.en;
}

const Arrow = () => {
  return (
    <div className="arrow">
      <div className="firstLine"/>
      <div className="secondLine"/>
    </div>
  )
}

class Header extends Component {
  constructor() {
    super();
    this.language = selectLanguage(navigator.language);
  }

  Arrow() {
    return (
      <div className="arrow">
        <div className="firstLine"/>
        <div className="secondLine"/>
      </div>
    )
  }

  render() {
    return (
      <div className="navbar">
        <div className="item title">Primary</div>
        <div className="item button">
          {this.language}
          <Arrow/>
        </div>
      </div>
    );
  }
  
}

export default Header;