import React, { Component } from "react";
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as IconoSvg } from '../image/icons/icon-book.svg';
import '../styles/log.css';
import axios from "axios";
import { sha256 } from '../other/encrypt';
import data from '../data/config.json';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.serverIP = data.serverIP;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event, fieldName) => {
        this.setState({
            [fieldName]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        // Usuario y Contraseña
        const username = this.state.username;
        const password = sha256(this.state.password);

        try {
            const response = await axios.post(`${this.serverIP}/app/login`, {
                username,
                password
            });
            if (response.status === 200) {
                const user = { token: response.data.token, username: response.data.username, email: response.data.email, msg: response.data.msg };
                localStorage.setItem("user", JSON.stringify(user));
                window.location = "./loby";
            } else {
                console.log(response.data.msg);
            }
        } catch (error) {
            console.error(error);
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
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                        <IconoSvg style={{ width: "auto", height: "50px" }} />
                        <h1>Iniciar Sesión</h1>
                    </div>
                    <form onSubmit={this.handleSubmit} className="form">
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
                        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                            <input type="submit" value="Iniciar Sesión" className="buttonLog" />
                            <Link to="/sign-up" className="underline-animation">Crear una cuenta</Link>
                        </div>
                    </form>
                </div>
                <Outlet />
            </main>
        )
    }
}

export default SignIn;