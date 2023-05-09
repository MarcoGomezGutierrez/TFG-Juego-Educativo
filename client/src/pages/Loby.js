import React, { Component } from "react";
import "../styles/app/loby.css";
import { Outlet, Link } from 'react-router-dom';
import axios from "axios";

const Nivel = ({ num, value }) => (
  <Link to={"/game"} state={{ value: value }} className="label" key={`nivel-${num / 10}`}>
    {num}
  </Link>
);

class Loby extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: 500,
      access: false,
      data: null
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
  
      const temariosResponse = await this.requestServer('http://localhost:8080/game/temarios', null, "get");
      this.setState({data: temariosResponse.results});
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

  niveles() {
    const nuevosNiveles = [];
    let grupoActual = [];

    for (let i = 1; i <= this.state.labels; i++) {
      grupoActual.push(<Nivel num={i} value={`value1-${i}`} />);
      if (i % 10 === 0) {
        nuevosNiveles.push(
          <div className="grupo" key={`grupo-${i / 10}`}>
            {grupoActual}
          </div>
        );
        grupoActual = [];
      }
    }

    if (grupoActual.length > 0) {
      nuevosNiveles.push(
        <div className="grupo" key={`grupo-${nuevosNiveles.length + 1}`}>
          {grupoActual}
        </div>
      );
    }

    return nuevosNiveles;
  }

  configuration() {
    return (
      <div className="configurationPanel">
        <Link to="/sign-in" className="editButton">Logout</Link>
        {this.editAccess()}
      </div>
    );
  }

  editAccess() {
    if (this.state.access) {
      return (<Link to="/edit" className="editButton">Edit Page</Link>)
    } else {
      return (<></>)
    }
  }

  render() {
    return (
      <main className="loby">
        {this.configuration()}
        <div className="mainContainer">
          {this.niveles()}
        </div>
        <button onClick={() => console.log(this.state.data[0].nombre_temario)}>Click</button>
        <Outlet />
      </main>
    )
  }
}

export default Loby;