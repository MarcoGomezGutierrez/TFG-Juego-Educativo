import React from "react";
import { ReactComponent as IconoBookSvg } from '../image/icons/icon-book.svg';
import { ReactComponent as IconoTextSvg } from '../image/icons/primary.svg';
import { Outlet, Link } from 'react-router-dom';
import '../styles/app/home.css';

const AcercaNosotros = ({ index, data }) => {
  return (
    <div key={data.id + index} className="acercaNosotrosContainer">
      <div className="content-container">
        <IconoTextSvg className="icon-text" />
        <p>{data.descripcion}</p>
        <Link to="/sign-up" className="button">{data.button}</Link>
      </div>
      <div className="book-container">
        <IconoBookSvg className="icon-book" />
      </div>
      <Outlet />
    </div>
  )
}

export default AcercaNosotros;