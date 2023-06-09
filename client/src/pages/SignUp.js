import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as IconoSvg } from "../image/icons/icon-book.svg";
import "../styles/log.css";
import axios from "axios";
import { sha256 } from "../other/encrypt";
import data from "../data/config.json";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      error: false,
    };
    this.serverIP = data.serverIP;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const users = JSON.parse(localStorage.getItem("user"));
      const token = users.token;
      this.serverIP = data.serverIP;
      /* Hago una petición al servidor para comprobar que el estado del token es valido y que su sesión todavía no haya expirado
            En caso de una sesión abierta: redirigir a la pestaña loby
            En caso de no existir una sesión o una sesión que haya caducado: se queda en la página actual.
            */
      const response = await axios.post(`${this.serverIP}/app/verification`, {
        token,
      });
      if (response.status === 200) {
        window.location = "./loby";
      }
    } catch (err) {}
  }

  handleChange = (event, fieldName) => {
    this.setState({
      [fieldName]: event.target.value,
    });
  };

  async handleSubmit(event) {
    event.preventDefault();

    // Usuario y Contraseña
    const username = this.state.username;
    const email = this.state.email;
    const password = sha256(this.state.password);

    // Peticion para el registro de usuario
    try {
      const response = await axios.post(`${this.serverIP}/app/signup`, {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        /*const user = {
          token: response.data.token,
          username: response.data.username,
          email: response.data.email,
          id: response.data.id,
          msg: response.data.msg,
        };*/
        //localStorage.setItem("user", JSON.stringify(user));
        window.location = `/verification`;
      } else {
        this.setState({ error: true });
      }
    } catch (error) {
      this.setState({ error: true });
    }
  }

  BackToHome() {
    return (
      <Link to="/" className="circle">
        <div className="arrow" />
      </Link>
    );
  }

  render() {
    return (
      <main className="background">
        {this.BackToHome()}
        <div className="login-container">
          <div className="login-shadow" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <IconoSvg style={{ width: "auto", height: "50px" }} />
            <h1>Registrarse</h1>
          </div>
          <form onSubmit={this.handleSubmit} className="form">
            <input
              placeholder="Email"
              type="email"
              value={this.state.email}
              onChange={(e) => this.handleChange(e, "email")}
              className="box"
            />
            <input
              placeholder="Nombre de Usuario"
              type="text"
              value={this.state.username}
              onChange={(e) => this.handleChange(e, "username")}
              className="box"
            />
            <input
              placeholder="Contraseña"
              type="password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e, "password")}
              className="box"
            />
            {this.state.error ? (
              <p style={{ color: "red" }}>Usuario o email no validos</p>
            ) : (
              ""
            )}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "25px" }}
            >
              <input type="submit" value="Registrarse" className="buttonLog" />
              <Link to="/sign-in" className="underline-animation">
                Tengo una cuenta
              </Link>
            </div>
          </form>
        </div>
        <Outlet />
      </main>
    );
  }
}

export default SignUp;
