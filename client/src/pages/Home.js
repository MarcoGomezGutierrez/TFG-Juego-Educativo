import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import data from "../data/config.json";
import JsonData from "../data/home.data.json";
import AcercaNosotros from "../components/home.components";
import "../styles/app/home.css";

class Home extends Component {
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
        console.log(response.data.msg);
        window.location = "./loby";
      }
    } catch (err) {}
  }

  render() {
    return (
      <Layout>
        {JsonData.map((data, index) => {
          //Añadir los diferentes ID, dependiendo de las secciones que quieras en la página web
          if (data.id === "nosotros") {
            return <AcercaNosotros index={index} data={data} />;
          } else {
            return <></>;
          }
        })}
      </Layout>
    );
  }
}

export default Home;
