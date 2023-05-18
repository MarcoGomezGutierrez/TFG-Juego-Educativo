import React, { useState, useEffect, useCallback } from 'react';
import "../styles/app/game.css";
import { useLocation } from 'react-router-dom';
import { encryptDataJson, decryptDataJson } from '../other/encrypt';
import { Outlet, Link } from 'react-router-dom';
import Matematicas from '../other/Matematicas';

// Se saca fuera para que no se cambien los indices al pulsar ningún botón
const start = 0; // Índice inicial
const end = 4; // Índice final (excluido)
const indices = Array.from({ length: end - start }, (_, index) => index + start); //Generar un iterador de 4 índices, empezando en 0
indices.sort(() => Math.random() - 0.5); //Desordenar los índices

function Game(porps) {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const [mostrarNumeroAleatorio, setMostrarNumeroAleatorio] = useState(false); // Agregar estado para controlar que no se cambien los números de las preguntas
  const [randomNumber, setRandomNumber] = useState(null);
  const [answers, setAnswers] = useState([]);

  const { state } = useLocation();
  const { temario, nivel, preguntas } = state || {};
  const [preguntaActual, setPreguntaActual] = useState(0);
  const numeroPreguntas = preguntas.length;

  // Encriptar el contenido e insertarlo en el local storage para guardar la selección del usuario
  const transformDataToJson = useCallback(() => {
    const data = {
      preguntaActual: preguntaActual,
      hover: hoverEnabled,
      respuestaSeleccionada: respuestaSeleccionada,
      mostrarNumeroAleatorio: false,
      randomNumber: null,
      answers: []
    };
    return encryptDataJson(data);
    //return JSON.stringify(data);
  }, [preguntaActual, hoverEnabled, respuestaSeleccionada]);
  
  useEffect(() => {
    // Recuperar la respuesta seleccionada del Local Storage al cargar la página
    const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
    if (respuestaGuardada) { // Si habia una pregunta ya realizada cargarla
      const jsonResponse = decryptDataJson(respuestaGuardada);
      setPreguntaActual(jsonResponse.preguntaActual);
      setHoverEnabled(jsonResponse.hover);
      setRespuestaSeleccionada(jsonResponse.respuestaSeleccionada);
      setMostrarNumeroAleatorio(jsonResponse.mostrarNumeroAleatorio);
      setRandomNumber(jsonResponse.randomNumber);
      setAnswers(jsonResponse.answers);
    }
  }, [temario, nivel]);

  useEffect(() => {
    /* Guardar la respuesta seleccionada en el Local Storage al cambiarla
      Solo funcionara en caso de que respuestaSeleccionada cambie de valor
    */
    if (respuestaSeleccionada) {
      localStorage.setItem(`${temario + nivel}`, transformDataToJson());
    }
  }, [respuestaSeleccionada, temario, nivel, transformDataToJson]);

  useEffect(() => {
    // Manejar temarios de Matemáticas
    const pregunta = preguntas[preguntaActual];
    const text = pregunta.pregunta;
    const metodo = text.match(/(\$.*?\$)/); // Busco en el texto una sentencia que este entre simbolos del $mitexto$
    // Miro que no sea null y que el valor de dentro sea $descomposicion$ e importante compruebo el valor de mostrarNumeroAleatorio para cuando se clica en una respuesta y no cambie
    if (metodo !== null && metodo[0] === "$descomposicion$" && !mostrarNumeroAleatorio) { 
      const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
      if (respuestaGuardada) { // Compruebo que exista el elemento en el Local Storage
        const jsonResponse = decryptDataJson(respuestaGuardada);
        if (jsonResponse.mostrarNumeroAleatorio) { // Y guardar los estados en caso de tener, si recargas tienes que almacenarlos
          setMostrarNumeroAleatorio(jsonResponse.mostrarNumeroAleatorio);
          setRandomNumber(jsonResponse.randomNumber);
          setAnswers(jsonResponse.answers);
          return;
        } // Verifico que no haya guardado ya un respuesta, si existe salgo y no sigo
      }
      setMostrarNumeroAleatorio(true);
      const {number, answer} = Matematicas.generateFourDigitRandomNumber(); //Genero una pregunta nueva y sus respuestas
      setRandomNumber(number);
      setAnswers(answer);
      const data = {
        preguntaActual: preguntaActual,
        hover: hoverEnabled,
        respuestaSeleccionada: respuestaSeleccionada,
        mostrarNumeroAleatorio: true,
        randomNumber: number,
        answers: answer
      };
      localStorage.setItem(`${temario + nivel}`, encryptDataJson(data)); // Las guardo en el local storage para evitar que al recargar la página se pierda
    } else if (metodo !== null && metodo[0] === "$composicion$" && !mostrarNumeroAleatorio) {
      const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
      if (respuestaGuardada) { // Compruebo que exista el elemento en el Local Storage
        const jsonResponse = decryptDataJson(respuestaGuardada);
        if (jsonResponse.mostrarNumeroAleatorio) { // Y guardar los estados en caso de tener, si recargas tienes que almacenarlos
          setMostrarNumeroAleatorio(jsonResponse.mostrarNumeroAleatorio);
          setRandomNumber(jsonResponse.randomNumber);
          setAnswers(jsonResponse.answers);
          return;
        } // Verifico que no haya guardado ya un respuesta, si existe salgo y no sigo
      }
      setMostrarNumeroAleatorio(true);
      const {number, answer} = Matematicas.generateFourDigitComposicionRandomNumber(); //Genero una pregunta nueva y sus respuestas
      console.log(number)
      setRandomNumber(number);
      setAnswers(answer);
      const data = {
        preguntaActual: preguntaActual,
        hover: hoverEnabled,
        respuestaSeleccionada: respuestaSeleccionada,
        mostrarNumeroAleatorio: true,
        randomNumber: number,
        answers: answer
      };
      localStorage.setItem(`${temario + nivel}`, encryptDataJson(data));
    }
  }, [preguntas, preguntaActual, hoverEnabled, respuestaSeleccionada, mostrarNumeroAleatorio, temario, nivel, transformDataToJson]);

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

  
  /* Controlador para seleccionar la respuesta siguiente, si es la última pregunta retorna a la página anterior, 
  si no lo es carga la siguiente pregunta*/
  const handleSiguientePregunta = () => {
    if (preguntaActual + 1 !== numeroPreguntas) {
      setPreguntaActual(preguntaActual + 1);
      setRespuestaSeleccionada(null);
      setHoverEnabled(true);
      setMostrarNumeroAleatorio(false);
      setAnswers([]);
    } else {
      localStorage.removeItem(`${temario + nivel}`);
      window.location = '/loby';
    }
  };

  // Volver a la página anterior
  const back = () => {
    return (
        <Link to="/loby" className="circle">
            <div className="arrow"/>
        </Link>
    );
  }

  // Pinta en blanco en caso de no tener 4 respuestas
  const preguntasNivel = (pregunta, index) => {
    if (answers.length !== 0) pregunta.respuestas[index].respuesta = answers[index];
    if (pregunta.respuestas[index].respuesta !== "") {
      return (
        <button key={index} className={`respuesta ${hoverEnabled ? 'respuesta-hover' : ''} ${detectarCorrecta(pregunta.respuestas[index])}`}
          onClick={
            (event) => handleAnswer(event, pregunta.respuestas[index])
          } disabled={respuestaSeleccionada === null ? false : true}>
          {pregunta.respuestas[index].respuesta}
        </button>
      );
    }
    return (<></>);
  }

  const renderPregunta = () => {
    const pregunta = preguntas[preguntaActual];
    // Buscar el símbolo ~ para subrayar el texto
    const text = pregunta.pregunta;
    const highlightedText = text
      .replace(/~(.*?)~/g, '<span style="text-decoration: underline; text-underline-offset: 3px;">$1</span>') // Subrayado
      .replace(/\*(.*?)\*/g, '<span style="text-decoration: underline; text-underline-offset: 3px;">$1</span>') // Negrita (Subrayado por el tipo de letra)
      .replace(/\$(.*?)\$/g, (match, capturedText) => {
        if (capturedText === "descomposicion" || capturedText === "composicion") {
          return `${randomNumber}`;
        } else {
          return "";
        }
      });
    return (
      <div className="mainContainerGame">
        <div className="title" dangerouslySetInnerHTML={{ __html: highlightedText }}></div>
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