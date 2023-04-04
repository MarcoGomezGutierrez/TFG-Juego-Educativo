import React, { Component } from "react";
//import { Outlet, Link } from 'react-router-dom';
import '../styles/login.css';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        console.log('Username:', this.state.username);
        console.log('Password:', this.state.password);

    }

    render() {
        return(
            <div className="login-container">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    <input 
                        placeholder="Nombre de Usuario"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        className="box"
                    />
                    <input 
                        placeholder="Contraseña"
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        className="box"
                    />
                    <input type="submit" value="Iniciar Sesión" className="button"/>
                </form>
            </div>
        )
    }
}

export default LogIn;