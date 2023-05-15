import React, { useState, useEffect, useCallback } from 'react';
import "../styles/app/game.css";
import { useLocation } from 'react-router-dom';
import { encryptDataJson, decryptDataJson } from '../other/encrypt';
import { Outlet, Link } from 'react-router-dom';

function Game(porps) {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [hoverEnabled, setHoverEnabled] = useState(true);

  const { state } = useLocation();
  const { temario, nivel, preguntas } = state || {};
  const [preguntaActual, setPreguntaActual] = useState(0);
  const numeroPreguntas = preguntas.length;

  // Encriptar el contenido e insertarlo en el local storage para guardar la selección del usuario
  const transformDataToJson = useCallback(() => {
    const data = {
      preguntaActual: preguntaActual,
      hover: hoverEnabled,
      respuestaSeleccionada: respuestaSeleccionada
    };
    return encryptDataJson(data);
  }, [preguntaActual, hoverEnabled, respuestaSeleccionada]);

  useEffect(() => {
    // Recuperar la respuesta seleccionada del Local Storage al cargar la página
    const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
    if (respuestaGuardada) {
      const jsonResponse = decryptDataJson(respuestaGuardada);
      setPreguntaActual(jsonResponse.preguntaActual);
      setHoverEnabled(jsonResponse.hover);
      setRespuestaSeleccionada(jsonResponse.respuestaSeleccionada);
    }
  }, [temario, nivel]);

  useEffect(() => {
    // Guardar la respuesta seleccionada en el Local Storage al cambiarla
    if (respuestaSeleccionada) {
      localStorage.setItem(`${temario + nivel}`, transformDataToJson());
    }
  }, [respuestaSeleccionada, temario, nivel, transformDataToJson]);

  const handleAnswer = (event, respuesta) => {
    if (respuestaSeleccionada === null) {
      setRespuestaSeleccionada(respuesta);
      setHoverEnabled(false);
    }
  };

  /* Si la respuesta seleccionada es incorrecta pinta en rojo,
  si la respuesta que queda es correcta puesto que no ha pasado el filtro anterior se pinta en verde tanto haya sido marcada como si no lo ha sido
  */
  const detectarCorrecta = (respuesta) => {
    if (respuestaSeleccionada != null) {
      if (!respuesta.correcta && respuesta.respuesta === respuestaSeleccionada.respuesta) {
        return 'incorrecta';
      } else if (respuesta.correcta) {
        return 'correcta';
      }
    }
    return '';
  };

  // Pinta en blanco en caso de no tener 4 respuestas
  const preguntasNivel = (pregunta, index) => {
    if (pregunta.respuestas[index].respuesta !== "") {
      return (<button className={`respuesta ${hoverEnabled ? 'respuesta-hover' : ''} ${detectarCorrecta(pregunta.respuestas[index])}`}
        onClick={
          (event) => handleAnswer(event, pregunta.respuestas[index])
        } disabled={respuestaSeleccionada === null ? false : true}>
        {pregunta.respuestas[index].respuesta}
      </button>);
    }
    return (<></>);
  }
  /* Controlador para seleccionar la respuesta siguiente, si es la última pregunta retorna a la página anterior, 
  si no lo es carga la siguiente pregunta*/
  const handleSiguientePregunta = () => {
    if (preguntaActual + 1 !== numeroPreguntas) {
      setPreguntaActual(preguntaActual + 1);
      setRespuestaSeleccionada(null);
      setHoverEnabled(true);
    } else {
      localStorage.removeItem(`${temario + nivel}`);
      window.location = '/loby';
    }
  };

  const back = () => {
    return (
        <Link to="/loby" className="circle">
            <div className="arrow"/>
        </Link>
    );
  }

  const renderPregunta = () => {
    const pregunta = preguntas[preguntaActual];
    const start = 0; // Índice inicial
    const end = 4; // Índice final (exclusivo)
    const indices = Array.from({ length: end - start }, (_, index) => index + start);

    return (
      <div className="mainContainerGame">
        <div className="title">{pregunta.pregunta}</div>
        <div className="respuestas-container">
          {indices.map((index) => { return preguntasNivel(pregunta, index) })}
        </div>
        {respuestaSeleccionada !== null && (
          <div className="siguiente-pregunta">
            <button className="buttonGame" onClick={handleSiguientePregunta}>
              {preguntaActual + 1 !== numeroPreguntas ? "Siguiente" : "Finalizar"}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="loby">
      {back()}
      {renderPregunta()}
      <Outlet/>
    </main>
  );
}

export default Game;