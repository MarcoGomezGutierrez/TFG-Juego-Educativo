import React, { Component } from "react";
import { Outlet, Link } from 'react-router-dom';
//import { Outlet, Link } from 'react-router-dom';
import '../styles/log.css';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event, fieldName) => {
        this.setState({
            [fieldName]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        console.log('Username:', this.state.username);
        console.log('Password:', this.state.password);
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