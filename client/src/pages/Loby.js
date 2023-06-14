import React, { Component } from "react";
import "../styles/app/loby.css";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import data from "../data/config.json";

class Loby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access: false, //Tener acceso a los servicios de administrador, modificar la base de datos desde el cliente
      data: [], //Almacenar la respuesta del Servidor Temarios
      repaso: [], //Almacenar la respuesta del Servidor Repaso
      configurationActive: false, //Manejar el panel de configuración
    };
    this.serverIP = data.serverIP; // Manejo de la IP de la API REST
  }

  // Cada vez que carga la página hacer estos pasos
  async componentDidMount() {
    try {
      // Traerme el Token guardado en el Local Storage
      const users = JSON.parse(localStorage.getItem("user"));
      const token = users.token;

      /* Hacer una única petición a la API REST, validando la sesión y devolviendo si puede editar o no la base de datos.
        Devuelve en caso de que haya una sesión valida, los datos de la base de datos.
      */
      const temariosResponse = await this.requestServer(
        `${this.serverIP}/game/temarios-agrupados`,
        token,
        "get"
      );
      if (!temariosResponse) {
        localStorage.removeItem("user");
        window.location = "./sign-in";
      } else if (temariosResponse.access) {
        await this.setState({ access: true });
      }
      this.setState({
        data: temariosResponse.data,
        repaso: temariosResponse.repaso,
      });
    } catch (err) {
      // Si hay algún error desloguear
      window.location = "./sign-in";
    }
  }

  async requestServer(url, token, server) {
    try {
      let response;
      if (server === "post") {
        response = await axios.post(url, { token });
      } else if (server === "get") {
        response = await axios.get(url, {
          data: {},
          params: {
            token: token,
          },
        });
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  cerrarSesion(event) {
    localStorage.removeItem("user");
  }

  // Imprime el boton de Cerrar Sesión y de edición de la Base de Datos
  configuration() {
    return <div className="configurationPanel">{this.gear()}</div>;
  }

  // Método que comprueba si el usuario tiene acceso al apartado de edición de la base de datos
  // Ver el resultado de los usuarios
  editAccess() {
    if (this.state.access) {
      return (
        <>
          <Link to="/edit" className="dropdown-content-nivel">
            Edit Page
          </Link>
          <Link to="/admin" className="dropdown-content-nivel">
            Control Users
          </Link>
        </>
      );
    } else {
      return <></>;
    }
  }

  handleConfiguration = (event) => {
    this.setState((prevState) => ({
      configurationActive: !prevState.configurationActive,
    }));
  };

  gear() {
    return (
      <>
        {!this.state.configurationActive ? (
          <button
            onClick={(event) => this.handleConfiguration(event)}
            className="gear"
          />
        ) : null}
        {this.panelConfiguration()}
      </>
    );
  }

  panelConfiguration() {
    if (this.state.configurationActive) {
      return (
        <div className="panelConfig">
          <button
            className="close-button"
            onClick={(event) => this.handleConfiguration(event)}
          />
          {this.editAccess()}
          <Link
            to="/sign-in"
            className="dropdown-content-nivel"
            onClick={(event) => this.cerrarSesion(event)}
          >
            Cerrar Sesión
          </Link>
        </div>
      );
    } else {
      return null;
    }
  }

  renderTemarioButton = (temario) => {
    return (
      <div key={temario.nombre_temario} className="dropdown">
        <button className="dropdown-btn"> {temario.nombre_temario} </button>
        <div className="dropdown-content">
          {temario.niveles.map((nivel) => (
            <Link
              to={`/game/${temario.nombre_temario + nivel.nivel}`}
              state={{
                temario: temario.nombre_temario,
                nivel: nivel.nivel,
                preguntas: nivel.preguntas,
              }}
              key={nivel.nivel}
              className="dropdown-content-nivel"
            >
              {nivel.nivel}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  renderRepasoButton = (repaso) => {
    return (
      <div key="repaso-seccion" className="dropdown">
        <Link
          to={`/game/${"repaso-seccion"}`}
          state={{ temario: "repaso", nivel: "repaso", preguntas: repaso }}
          key="repaso-seccion-niveles"
          className="btn-repaso"
        >
          Repaso
        </Link>
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
          {this.state.repaso !== []
            ? this.renderRepasoButton(this.state.repaso)
            : ""}
        </div>
        <Outlet />
      </main>
    );
  }
}

export default Loby;
