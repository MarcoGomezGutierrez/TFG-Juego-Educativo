import React, { useState, useEffect, useCallback } from 'react';
import { ReactComponent as IconoSvg } from '../image/icons/icono-image.svg';
import "../styles/app/game.css";
import { useLocation } from 'react-router-dom';
import { encryptDataJson, decryptDataJson } from '../other/encrypt';
import { Outlet, Link } from 'react-router-dom';
import Matematicas from '../other/Matematicas';
import { methodMap } from '../other/mathMethods.js';
import BarraHistorial from '../components/BarraHistorial';

function Game(porps) {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const [mostrarNumeroAleatorio, setMostrarNumeroAleatorio] = useState(false); // Agregar estado para controlar que no se cambien los números de las preguntas
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const start = 0; // Índice inicial
  const end = 4; // Índice final (exclusivo)
  const [indices, setIndices] = useState(Array.from({ length: end - start }, (_, index) => index + start));
  const [handleSort, setHandleSort] = useState(true);
  const { state } = useLocation(); //Traer los datos de props
  const { temario, nivel, preguntas } = state || {}; //Traer los datos y guardarlos en su tabla correspondiente
  const [preguntaActual, setPreguntaActual] = useState(0); //Manejar la pregunta actual
  const numeroPreguntas = preguntas.length; //Manejo del número de preguntas totales
  const [preguntasFalladas, setPreguntasFalladas] = useState([]); // Números de preguntas falladas
  const [preguntasAcertadas, setPreguntasAcertadas] = useState([]); // Números de preguntas acertadas

  // Encriptar el contenido e insertarlo en el local storage para guardar la selección del usuario
  const transformDataToJson = (preguntaActual, hover, respuestaSeleccionada, mostrar, question, answer, indices, handleSort, preguntasAcertadas, preguntasFalladas) => {
    const data = {
      preguntaActual: preguntaActual,
      hover: hover,
      respuestaSeleccionada: respuestaSeleccionada,
      mostrarNumeroAleatorio: mostrar,
      question: question,
      answers: answer,
      indices: indices,
      handleSort: handleSort,
      preguntasAcertadas: preguntasAcertadas,
      preguntasFalladas: preguntasFalladas
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
      setQuestion(jsonResponse.question);
      setAnswers(jsonResponse.answers);
      setHandleSort(jsonResponse.handleSort);
      setPreguntasAcertadas(jsonResponse.preguntasAcertadas);
      setPreguntasFalladas(jsonResponse.preguntasFalladas);
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
        setQuestion(jsonResponse.question);
        setAnswers(jsonResponse.answers);
        return;
      } // Verifico que no haya guardado ya un respuesta, si existe salgo y no sigo
    }
    setMostrarNumeroAleatorio(true);
    const { question, answer } = callback; //Genero una pregunta nueva y sus respuestas
    setQuestion(question);
    setAnswers(answer);
    localStorage.setItem(
      `${temario + nivel}`,
      transformDataToJson(
        respuestaGuardada ? jsonResponse.preguntaActual : preguntaActual,
        hoverEnabled,
        respuestaSeleccionada,
        true,
        question,
        answer,
        respuestaGuardada ? jsonResponse.indices : indices,
        respuestaGuardada ? jsonResponse.handleSort : handleSort,
        respuestaGuardada ? jsonResponse.preguntasAcertadas : preguntasAcertadas,
        respuestaGuardada ? jsonResponse.preguntasFalladas : preguntasFalladas,
      )
    ); // Las guardo en el local storage para evitar que al recargar la página se pierda
  }, [nivel, temario, hoverEnabled, respuestaSeleccionada, preguntaActual, handleSort, indices, preguntasAcertadas, preguntasFalladas]);


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

  const handleAnswer = (event, respuesta) => { //Cuando el usuario selecciona alguna respuesta
    if (respuestaSeleccionada === null) {
      setRespuestaSeleccionada(respuesta);
      setHoverEnabled(false);
      if (respuesta.correcta) {
        setPreguntasAcertadas([...preguntasAcertadas, preguntaActual + 1]);
      } else {
        setPreguntasFalladas([...preguntasFalladas, preguntaActual + 1]);
      }
      const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
      let jsonResponse = "";
      if (respuestaGuardada) { // Compruebo que exista el elemento en el Local Storage
        jsonResponse = decryptDataJson(respuestaGuardada);
      } // Verifico que no haya guardado ya un respuesta, si existe salgo y no sigo
      localStorage.setItem(
        `${temario + nivel}`,
        transformDataToJson(
          respuestaGuardada ? jsonResponse.preguntaActual : preguntaActual,
          false,
          respuesta,
          true,
          respuestaGuardada ? jsonResponse.question : question,
          respuestaGuardada ? jsonResponse.answers : answers,
          indices,
          handleSort,
          [...preguntasAcertadas, preguntaActual + 1],
          [...preguntasFalladas, preguntaActual + 1]
        )
      );
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
      setQuestion(null);
      setAnswers([]);
      setShowImage(false);
      setHandleSort(true);
      localStorage.setItem(
        `${temario + nivel}`,
        transformDataToJson(preguntaActual + 1,
          true,
          null,
          false,
          null,
          [],
          indices,
          true,
          preguntasAcertadas,
          preguntasFalladas
        )
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
    } else return (<></>); //Devolver campo vacio, no hay respuesta
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
    if (handleSort) {
      setHandleSort(false);
      setIndices([...indices.sort(() => Math.random() - 0.5)]); //Desordenar los índices
    }
    // Buscar el símbolo ~ para subrayar el texto
    const text = pregunta.pregunta;
    var highlightedText = text
      .replace(/~(.*?)~/g, '<span class="highlighted">$1</span>') // Subrayado
      .replace(/\*(.*?)\*/g, '<strong class="highlightedBold">$1</strong>') // Negrita (Subrayado por el tipo de letra)
      .replace(/\$(.*?)\$/g, (match, capturedText) => {
        if (methodMap.hasOwnProperty(capturedText)) {
          return `<br>${question}`;
        } else {
          return "";
        }
      });
    highlightedText = highlightedText + (pregunta.url_imagen !== null ? '<strong class="highlightedBold">(Ver la Imagen)</strong>' : '')
    return (
      <div className="mainContainerGame">
        <div className='title-image'>
          <div className="title">
            <span dangerouslySetInnerHTML={{ __html: highlightedText }}></span>
          </div>
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
      {preguntas[preguntaActual].url_imagen !== null ?
        <button className='button-icon' onClick={() => handleImageClick(preguntas[preguntaActual].url_imagen)}>
          <IconoSvg className="icono-svg" />
        </button> : ""}
      {showImage && <ImageContainer imageUrl={selectedImageUrl} onClose={handleCloseImage} />}
      <BarraHistorial
        preguntaActual={preguntaActual + 1}
        numeroPreguntas={numeroPreguntas}
        preguntasFalladas={preguntasFalladas}
        preguntasAcertadas={preguntasAcertadas}
      />
      {renderPregunta()}
      <Outlet />
    </main>
  );
}

export default Game;