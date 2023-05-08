import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";

class Home extends Component {

    constructor(props) {
        super(props);
        try {
            const users = JSON.parse(localStorage.getItem("user"));
            const token = users.token;
            /* Hago una petición al servidor para comprobar que el estado del token es valido y que su sesión todavía no haya expirado
            En caso de una sesión abierta: redirigir a la pestaña loby
            En caso de no existir una sesión o una sesión que haya caducado: se queda en la página actual.
            */
            axios.post('http://localhost:8080/app/loby', {
                token
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data.msg);
                        window.location = "./loby";
                    } else {
                        console.log(response.data.msg);
                    }
                })
                .catch(error => {
                    // TODO: Eliminar
                    console.error(error);
                });
        } catch (err) {
            // TODO: Eliminar
            console.error(err);
        }

    }

    render() {
        return (
            <Layout>
                <div> Home </div>
            </Layout>
        )
    }
}

export default Home;