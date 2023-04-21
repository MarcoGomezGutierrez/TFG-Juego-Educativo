import React, { Component } from "react";
import { Outlet, Link } from 'react-router-dom';
//import { Outlet, Link } from 'react-router-dom';
import '../styles/log.css';
import axios from 'axios';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            token:""
        }
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
        const password = this.state.password;
        
        // Peticion para el inicio de sesión
        try {
            const response = await axios.post('http://localhost:3000/register', {
              username,
              password,
            });
            this.setState({
                token: response.data.token
            }, () => {
                console.log('Username:', username);
                console.log('Password:', password);
                console.log('Token:', this.state.token);
            });
          } catch (error) {
            console.error(error);
          }
    }

    BackToHome() {
        return (
            <Link to="/" className="circle">
                <div className="arrow"/>
            </Link>
        );
    }

    render() {
        return(
            <>
                {this.BackToHome()}
                <div className="login-container">
                    <h1>Iniciar Sesión</h1>
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
                        <input type="submit" value="Iniciar Sesión" className="button"/>
                    </form>
                </div>
                <Outlet/>
            </>
        )
    }
}

export default SignIn;