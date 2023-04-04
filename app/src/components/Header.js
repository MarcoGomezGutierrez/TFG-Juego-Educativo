import React, { Component } from "react";
import { Outlet, Link } from 'react-router-dom';
import "../styles/layout/header.css";


class Header extends Component {

  render() {
    return (
      <>
        <div className="navbar">
          <div className="item title">Primary</div>
          <div className="item">
            <Link to="/login" className="button">Sign in</Link>
            <div className="button border">Sign up</div>
          </div>
        </div>
        <Outlet/>
      </>
    );
  }
  
}

export default Header;