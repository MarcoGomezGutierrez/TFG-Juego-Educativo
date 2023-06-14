import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import data from "../data/config.json";
import TablasUsuarios from "../components/TablasUsuarios";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: "",
      data: [],
    };

    this.serverIP = data.serverIP;
  }

  async componentDidMount() {
    try {
      const users = JSON.parse(localStorage.getItem("user"));
      const token = users.token;

      const response = await axios.get(`${this.serverIP}/game/control`, {
        data: {},
        params: {
          token: token,
        },
      });
      if (!response.data.access) {
        console.log(response.data.access);
        window.location = "./loby";
      } else {
        this.setState({
          data: response.data.data,
        });
      }
    } catch (err) {
      console.error(err);
      window.location = "./loby";
    }
  }

  BackToLoby() {
    return (
      <Link to="/loby" className="circle">
        <div className="arrow" />
      </Link>
    );
  }

  handleUserChange = (event) => {
    this.setState({
      selectedUser: event.target.value,
    });
  };

  render() {
    const filteredData = this.state.selectedUser
      ? { [this.state.selectedUser]: this.state.data[this.state.selectedUser] }
      : this.state.data;
    return (
      <main className="loby">
        {this.BackToLoby()}
        <div className="mainContainer">
          <h1 style={{ textAlign: "center" }}>Control de Usuarios</h1>
          <div className="filter">
            <label htmlFor="userFilter">Filtrar por usuario:</label>
            <select
              id="userFilter"
              value={this.state.selectedUser}
              onChange={this.handleUserChange}
            >
              <option value="">Mostrar todos</option>
              {Object.keys(this.state.data).map((username) => (
                <option key={username} value={username}>
                  {username}
                </option>
              ))}
            </select>
          </div>
          <TablasUsuarios data={filteredData} />
        </div>
        <Outlet />
      </main>
    );
  }
}

export default Admin;
