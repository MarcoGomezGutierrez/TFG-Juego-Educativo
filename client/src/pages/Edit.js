import React, { Component } from "react";
import "../styles/app/edit.css";
import { Outlet, Link } from 'react-router-dom';
import axios from "axios";
import data from '../data/config.json';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temario: "",
            nivel: "",
            pregunta: "",
            url_imagen: null,
            archivo_imagen: null,
            respuesta: {
                res1: {
                    texto: "",
                    correcta: false
                },
                res2: {
                    texto: "",
                    correcta: false
                },
                res3: {
                    texto: "",
                    correcta: false
                },
                res4: {
                    texto: "",
                    correcta: false
                }
            },
            cuatroRespuestas: true,
            imagen: null
        }

        this.serverIP = data.serverIP;
    }

    async componentDidMount() {
        try {
            const users = JSON.parse(localStorage.getItem("user"));
            const token = users.token;

            const response = await axios.post(`${this.serverIP}/app/verification`, {
                token
            });
            if (!response.data.access) {
                window.location = "./loby";
            }
        } catch (err) {
            console.error(err);
            window.location = "./loby"
        }
    }

    handleChange = (event, fieldName) => {
        this.setState({
            [fieldName]: event.target.value
        });
    }

    handleImagenChange = (event) => {
        const archivo = event.target.files[0];
        const reader = new FileReader();
        try {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    this.setState({
                        archivo_imagen: archivo,
                        imagen: reader.result,
                        url_imagen: archivo.name
                    });
                }
            };

            if (archivo) {
                reader.readAsDataURL(archivo);
            }
        } catch (err) { }
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const { temario, nivel, pregunta, url_imagen, respuesta } = this.state;

        const res1 = this.state.respuesta.res1.texto;
        const res2 = this.state.respuesta.res2.texto;
        const res3 = this.state.respuesta.res3.texto;
        const res4 = this.state.respuesta.res4.texto;

        const cor1 = this.state.respuesta.res1.correcta;
        const cor2 = this.state.respuesta.res2.correcta;
        const cor3 = this.state.respuesta.res3.correcta;
        const cor4 = this.state.respuesta.res4.correcta;

        const correctas = [cor1, cor2, cor3, cor4];
        const n_corr = correctas.filter(valor => valor === true).length;

        if ((!temario || !nivel || !pregunta || !res1 || !res2 || !res3 || !res4) && this.state.cuatroRespuestas) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        if (n_corr !== 1) {
            alert("Por favor, solo un campo verdadero en las respuestas.");
            return;
        }

        try {
            const response = await axios.post(`${this.serverIP}/game/insert`, {
                temario,
                nivel,
                pregunta,
                respuesta,
                url_imagen
            });
            if (response.status === 200) {
                console.log(response.data.msg);
            } else {
                console.log(response.data.msg);
            }
        } catch (error) {
            console.error(error);
        }

        this.setState({
            pregunta: "",
            respuesta: {
                res1: {
                    texto: "",
                    correcta: false
                },
                res2: {
                    texto: "",
                    correcta: false
                },
                res3: {
                    texto: "",
                    correcta: false
                },
                res4: {
                    texto: "",
                    correcta: false
                }
            },
            url_imagen: null,
            archivo_imagen: null,
            imagen: null,
            cuatroRespuestas: true
        });
    }

    BackToLoby() {
        return (
            <Link to="/loby" className="circle">
                <div className="arrow" />
            </Link>
        );
    }

    render() {
        const { imagen } = this.state;
        return (
            <main>
                {this.BackToLoby()}
                <div className="form-container">
                    <h1>Editar Preguntas</h1>
                    <form onSubmit={this.handleSubmit} className="formEdit">
                        <div className="form-in-line">
                            <h2>Obligatorio rellenar todo:</h2>
                            <input
                                type="checkbox"
                                checked={this.state.cuatroRespuestas}
                                onChange={(e) => {
                                    this.setState(prevState => ({
                                        cuatroRespuestas: !prevState.cuatroRespuestas
                                    }));
                                }}
                                className="check"
                            />
                            <input type="file" onChange={this.handleImagenChange} />
                            {imagen && <img src={imagen} style={{ maxWidth: '300px', height: 'auto' }} alt="Vista previa de la imagen" />}
                        </div>
                        <div className="form-in-line">
                            <h2>Temario:</h2>
                            <input
                                placeholder="Temario"
                                type="text"
                                value={this.state.temario}
                                onChange={(e) => this.handleChange(e, "temario")}
                                className="boxEdit"
                            />
                        </div>
                        <div className="form-in-line">
                            <h2>Nivel:</h2>
                            <input
                                placeholder="Nivel"
                                type="text"
                                value={this.state.nivel}
                                onChange={(e) => this.handleChange(e, "nivel")}
                                className="boxEdit"
                            />
                        </div>
                        <div className="form-in-line">
                            <h2>Pregunta:</h2>
                            <input
                                placeholder="Pregunta"
                                type="text"
                                value={this.state.pregunta}
                                onChange={(e) => this.handleChange(e, "pregunta")}
                                className="boxEdit"
                            />
                        </div>
                        <div className="form-in-line">
                            <h2>Respuesta 1:</h2>
                            <input
                                placeholder="Respuesta 1"
                                type="text"
                                value={this.state.respuesta.res1.texto}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    this.setState(prevState => {
                                        const newRespuesta = { ...prevState.respuesta.res1, texto: newValue };
                                        const newRespuestas = { ...prevState.respuesta, res1: newRespuesta };
                                        return { respuesta: newRespuestas };
                                    });
                                }}
                                className="boxEdit"
                            />
                            <input
                                type="checkbox"
                                checked={this.state.respuesta.res1.correcta}
                                onChange={(e) => {
                                    const newValue = e.target.checked;
                                    this.setState(prevState => {
                                        const newRespuesta = { ...prevState.respuesta.res1, correcta: newValue };
                                        const newRespuestas = { ...prevState.respuesta, res1: newRespuesta };
                                        return { respuesta: newRespuestas };
                                    });
                                }}
                                className="check"
                            />
                        </div>
                        <div className="form-in-line">
                            <h2>Respuesta 2:</h2>
                            <input
                                placeholder="Respuesta 2"
                                type="text"
                                value={this.state.respuesta.res2.texto}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    this.setState(prevState => {
                                        const newRespuesta = { ...prevState.respuesta.res2, texto: newValue };
                                        const newRespuestas = { ...prevState.respuesta, res2: newRespuesta };
                                        return { respuesta: newRespuestas };
                                    });
                                }}
                                className="boxEdit"
                            />
                            <input
                                type="checkbox"
                                checked={this.state.respuesta.res2.correcta}
                                onChange={(e) => {
                                    const newValue = e.target.checked;
                                    this.setState(prevState => {
                                        const newRespuesta = { ...prevState.respuesta.res2, correcta: newValue };
                                        const newRespuestas = { ...prevState.respuesta, res2: newRespuesta };
                                        return { respuesta: newRespuestas };
                                    });
                                }}
                                className="check"
                            />
                        </div>
                        <div className="form-in-line">
                            <h2>Respuesta 3:</h2>
                            <input
                                placeholder="Respuesta 3"
                                type="text"
                                value={this.state.respuesta.res3.texto}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    this.setState(prevState => {
                                        const newRespuesta = { ...prevState.respuesta.res3, texto: newValue };
                                        const newRespuestas = { ...prevState.respuesta, res3: newRespuesta };
                                        return { respuesta: newRespuestas };
                                    });
                                }}
                                className="boxEdit"
                            />
                            <input
                                type="checkbox"
                                checked={this.state.respuesta.res3.correcta}
                                onChange={(e) => {
                                    const newValue = e.target.checked;
                                    this.setState(prevState => {
                                        const newRespuesta = { ...prevState.respuesta.res3, correcta: newValue };
                                        const newRespuestas = { ...prevState.respuesta, res3: newRespuesta };
                                        return { respuesta: newRespuestas };
                                    });
                                }}
                                className="check"
                            />
                        </div>
                        <div className="form-in-line">
                            <h2>Respuesta 4:</h2>
                            <input
                                placeholder="Respuesta 4"
                                type="text"
                                value={this.state.respuesta.res4.texto}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    this.setState(prevState => {
                                        const newRespuesta = { ...prevState.respuesta.res4, texto: newValue };
                                        const newRespuestas = { ...prevState.respuesta, res4: newRespuesta };
                                        return { respuesta: newRespuestas };
                                    });
                                }}
                                className="boxEdit"
                            />
                            <input
                                type="checkbox"
                                checked={this.state.respuesta.res4.correcta}
                                onChange={(e) => {
                                    const newValue = e.target.checked;
                                    this.setState(prevState => {
                                        const newRespuesta = { ...prevState.respuesta.res4, correcta: newValue };
                                        const newRespuestas = { ...prevState.respuesta, res4: newRespuesta };
                                        return { respuesta: newRespuestas };
                                    });
                                }}
                                className="check"
                            />
                        </div>
                        <input type="submit" value="Insertar" className="buttonSubmit" />
                    </form>
                </div>
                <Outlet />
            </main>
        )
    }
}

export default Edit;