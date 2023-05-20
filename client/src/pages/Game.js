import React, { useState, useEffect, useCallback } from 'react';
import { ReactComponent as IconoSvg } from '../image/icons/imagen.svg';
import "../styles/app/game.css";
import { useLocation } from 'react-router-dom';
import { encryptDataJson, decryptDataJson } from '../other/encrypt';
import { Outlet, Link } from 'react-router-dom';
import Matematicas from '../other/Matematicas';
import { methodMap } from '../other/mathMethods.js';

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
  const [showImage, setShowImage] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const { state } = useLocation();
  const { temario, nivel, preguntas } = state || {};
  const [preguntaActual, setPreguntaActual] = useState(0);
  const numeroPreguntas = preguntas.length;

  // Encriptar el contenido e insertarlo en el local storage para guardar la selección del usuario
  const transformDataToJson = (preguntaActual, hover, respuestaSeleccionada, mostrar, number, answer) => {
    const data = {
      preguntaActual: preguntaActual,
      hover: hover,
      respuestaSeleccionada: respuestaSeleccionada,
      mostrarNumeroAleatorio: mostrar,
      randomNumber: number,
      answers: answer
    };
    return encryptDataJson(data);
    //return JSON.stringify(data);
  };

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

  // Función callback para refactorizar el código
  const generateMathAnswer = useCallback((callback) => {
    const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
    let jsonResponse = "";
    if (respuestaGuardada) { // Compruebo que exista el elemento en el Local Storage
      jsonResponse = decryptDataJson(respuestaGuardada);
      if (jsonResponse.mostrarNumeroAleatorio) { // Y guardar los estados en caso de tener, si recargas tienes que almacenarlos
        setMostrarNumeroAleatorio(jsonResponse.mostrarNumeroAleatorio);
        setRandomNumber(jsonResponse.randomNumber);
        setAnswers(jsonResponse.answers);
        return;
      } // Verifico que no haya guardado ya un respuesta, si existe salgo y no sigo
    }
    setMostrarNumeroAleatorio(true);
    const { question, answer } = callback; //Genero una pregunta nueva y sus respuestas
    setRandomNumber(question);
    setAnswers(answer);
    localStorage.setItem(
      `${temario + nivel}`,
      transformDataToJson(respuestaGuardada ? jsonResponse.preguntaActual : preguntaActual, hoverEnabled, respuestaSeleccionada, true, question, answer)
    ); // Las guardo en el local storage para evitar que al recargar la página se pierda
  }, [nivel, temario, hoverEnabled, respuestaSeleccionada, preguntaActual]);


  useEffect(() => {
    // Manejar temarios de Matemáticas
    const pregunta = preguntas[preguntaActual];
    const text = pregunta.pregunta;
    const metodo = text.match(/(\$.*?\$)/); // Buscar en el texto una sentencia que este entre simbolos del $mitexto$
    // 
    /**
     * Mirar que no sea null y que el valor de dentro sea $descomposicion$ e importante compruebo 
     * el valor de mostrarNumeroAleatorio para cuando se clica en una respuesta y no cambie.
     * Simplificación del código, atraves de un objeto  compruebo todo. De esta forma tengo mejor
     * legibilidad en mi código.
     */
    if (metodo !== null && metodo[1] !== undefined) {
      const methodName = metodo[1];
      const cleanMethodName = methodName.replace(/\$/g, ''); // Eliminar los símbolos de dólar

      if (methodMap.hasOwnProperty(cleanMethodName)) {
        const { method, args } = methodMap[cleanMethodName];
        if (!mostrarNumeroAleatorio) {
          generateMathAnswer(Matematicas[method](...args));
        }
      }
    }
  }, [preguntas, preguntaActual, hoverEnabled, respuestaSeleccionada, mostrarNumeroAleatorio, temario, nivel, generateMathAnswer]);

  const handleAnswer = (event, respuesta) => {
    if (respuestaSeleccionada === null) {
      setRespuestaSeleccionada(respuesta);
      setHoverEnabled(false);
      const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
      let jsonResponse = "";
      if (respuestaGuardada) { // Compruebo que exista el elemento en el Local Storage
        jsonResponse = decryptDataJson(respuestaGuardada);
        localStorage.setItem(
          `${temario + nivel}`,
          transformDataToJson(jsonResponse.preguntaActual, false, respuesta, true, jsonResponse.randomNumber, jsonResponse.answers)
        );
      } // Verifico que no haya guardado ya un respuesta, si existe salgo y no sigo
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
      setRandomNumber(null);
      setAnswers([]);
      setShowImage(false);
      localStorage.setItem(
        `${temario + nivel}`,
        transformDataToJson(preguntaActual + 1, true, null, false, null, [])
      );
    } else {
      localStorage.removeItem(`${temario + nivel}`);
      window.location = '/loby';
    }
  };

  // Volver a la página anterior
  const back = () => {
    return (
      <Link to="/loby" className="circle">
        <div className="arrow" />
      </Link>
    );
  }

  // Pinta en blanco en caso de no tener 4 respuestas
  const preguntasNivel = (pregunta, index) => {
    if (answers.length !== 0 && answers[index]) pregunta.respuestas[index].respuesta = answers[index];
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

  const ImageContainer = ({ imageUrl, onClose }) => {
    return (
      <div className="image-container">
        <img src={require(`../image/preguntas/${imageUrl}`)} alt="Imagen" />
        <span className="close" onClick={onClose}>&times;</span>
      </div>
    );
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowImage(true);
  };

  const handleCloseImage = () => {
    setShowImage(false);
    setSelectedImageUrl('');
  };

  const renderPregunta = () => {
    const pregunta = preguntas[preguntaActual];

    // Buscar el símbolo ~ para subrayar el texto
    const text = pregunta.pregunta;
    const highlightedText = text
      .replace(/~(.*?)~/g, '<span style="text-decoration: underline; text-underline-offset: 3px;">$1</span>') // Subrayado
      .replace(/\*(.*?)\*/g, '<span style="text-decoration: underline; text-underline-offset: 3px;">$1</span>') // Negrita (Subrayado por el tipo de letra)
      .replace(/\$(.*?)\$/g, (match, capturedText) => {
        if (methodMap.hasOwnProperty(capturedText)) {
          return `<br>${randomNumber}`;
        } else {
          return "";
        }
      });
    return (
      <div className="mainContainerGame">
        <div className='title-image'>
          <div className="title" dangerouslySetInnerHTML={{ __html: highlightedText }}></div>
          {pregunta.url_imagen !== null ?
            <button className='button-icon' onClick={() => handleImageClick(pregunta.url_imagen)}>
              <IconoSvg className="icono-svg" />
            </button> : ""}
          {showImage && <ImageContainer imageUrl={selectedImageUrl} onClose={handleCloseImage} />}
        </div>
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
      <Outlet />
    </main>
  );
}

export default Game;