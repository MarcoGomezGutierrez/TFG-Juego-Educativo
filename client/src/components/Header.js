import React, { useEffect, useState} from "react";
import { ReactComponent as IconoWebSvg } from '../image/icons/icono-web.svg';
import { Outlet, Link } from 'react-router-dom';
import "../styles/layout/header.css";


function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showHeader, setShowHeader] = useState(""); // Inicialmente empieza en vacio para que en la primera carga no se reproduzca la animación

  //Detectar si la página hace scroll, si hace scroll hacia abajo ocultar el header y hacer la animación, si hace scroll hacia arriba lo muestra
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setShowHeader(currentPosition <= scrollPosition || currentPosition < 10);
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <>
      <header className={`navbar ${
          showHeader === true ? "fade-out-down" : showHeader === false ? "fade-out-up" : ""
        }`}>
        <IconoWebSvg className="item icon-web"/>
        <div className="item">
          <Link to="/sign-in" className="underline-animation">Iniciar Sesión</Link>
          <Link to="/sign-up" className="buttonHeader">Registrarse</Link>
        </div>
      </header>
      <Outlet/>
    </>
  );
  
}

export default Header;