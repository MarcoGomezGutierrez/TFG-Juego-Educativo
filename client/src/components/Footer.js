import React, { Component } from "react";
import { ReactComponent as IconoTextSvg } from '../image/icons/primary-white.svg';
import { ReactComponent as IconoBookSvg } from '../image/icons/icon-book.svg';
import { Outlet, Link } from 'react-router-dom';
import "../styles/layout/footer.css"

class Footer extends Component {

  render() {
    return (
      <div className="footerContainer">
        <div className="container">
          <IconoTextSvg style={{ width: "auto", height: "50px" }} />
        </div>
        <div className="space-container">
          <div className="container">
            <IconoBookSvg style={{ width: "auto", height: "50px" }} />
            <Link to="/sign-in" className="underline-animation" style={{ color: "white" }}>Iniciar Sesión</Link>
            <Link to="/sign-up" className="underline-animation" style={{ color: "white" }}>Registrarse</Link>
          </div>
          <div className="container">
            <Link to="https://www.uneatlantico.es/" className="underline-animation" style={{ color: "white" }}>UNEAT</Link>
          </div>
        </div>
        <Outlet />
      </div>
    );
  }

}

export default Footer;