import React, { Component } from "react";
import "../styles/app/loby.css";
import { Outlet, Link } from 'react-router-dom';
import axios from "axios";

/*const Nivel = ({ num, value }) => (
  <Link to={"/game"} state={{ value: value }} className="label" key={`nivel-${num / 10}`}>
    {num}
  </Link>
);*/

class Loby extends Component {

  constructor(props) {
    super(props);
    this.state = {
      access: false,
      data: []
    }
  }

  async componentDidMount() {
    try {
      const users = JSON.parse(localStorage.getItem("user"));
      const token = users.token;

      const lobyResponse = await this.requestServer('http://localhost:8080/app/loby', token, "post");
      if (!lobyResponse) {
        localStorage.removeItem("user");
        window.location = "./sign-in";
      }

      const editResponse = await this.requestServer('http://localhost:8080/app/edit', token, "post");
      if (editResponse) {
        this.setState({ access: true });
      }

      const temariosResponse = await this.requestServer('http://localhost:8080/game/temarios-agrupados', null, "get");
      this.setState({ data: temariosResponse.data });
    } catch (err) {
      console.error(err);
      this.setState({ access: false });
      window.location = "./sign-in"
    }
  }

  async requestServer(url, token, server) {
    try {
      let response;
      if (server === "post") {
        response = await axios.post(url, { token });
      } else if (server === "get") {
        response = await axios.get(url);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // Imprime el boton de Cerrar Sesión y de edición de la Base de Datos
  configuration() {
    return (
      <div className="configurationPanel">
        <Link to="/sign-in" className="editButton">Cerrar Sesión</Link>
        {this.editAccess()}
      </div>
    );
  }

  // Método que comprueba si el usuario tiene acceso al apartado de edición de la base de datos
  editAccess() {
    if (this.state.access) {
      return (<Link to="/edit" className="editButton">Edit Page</Link>)
    } else {
      return (<></>)
    }
  }

  renderTemarioButton = (temario) => {
    return (
      <div key={temario.nombre_temario} className="dropdown">
        <button className="dropdown-btn"> {temario.nombre_temario} </button>
        <div className="dropdown-content">
          {temario.niveles.map((nivel) => (
            <Link to={`/game/${temario.nombre_temario + nivel.nivel}`} state={{ temario: temario.nombre_temario, nivel: nivel.nivel, preguntas: nivel.preguntas }} key={nivel.nivel} className="dropdown-content-nivel">{nivel.nivel}</Link>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { data } = this.state;

    return (
      <main className="loby">
        {this.configuration()}
        <div className="mainContainer">
          {data.map((temario) => this.renderTemarioButton(temario))}
        </div>
        <Outlet />
      </main>
    )
  }
}

export default Loby;