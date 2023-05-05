import React from "react";
import { Outlet } from 'react-router-dom';
import '../styles/log.css';
import SignIn from "./SignIn";

let key = process.env.KEY;

class SignUp extends SignIn {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log('Email:', this.state.email);
        console.log('Username:', this.state.username);
        console.log('Password:', this.state.password);

        console.log("Variable de entorno:", key);
    }

    render() {
        return(
            <>
                {this.BackToHome()}
                <div className="login-container">
                    <h1>Registrarse</h1>
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
                        <input type="submit" value="Registrarse" className="button"/>
                    </form>
                </div>
                <Outlet/>
            </>
        )
    }
}

export default SignUp;