import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as IconoSvg } from "../image/icons/icono-image.svg";
import "../styles/app/game.css";
import { useLocation } from "react-router-dom";
//import { encryptDataJson, decryptDataJson } from '../other/encrypt';
import { Outlet, Link } from "react-router-dom";
import Matematicas from "../other/Matematicas";
import { methodMap } from "../other/mathMethods.js";
import BarraHistorial from "../components/BarraHistorial";
import jsonData from "../data/config.json";
import axios from "axios";

function Game(porps) {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const [mostrarNumeroAleatorio, setMostrarNumeroAleatorio] = useState(false); // Agregar estado para controlar que no se cambien los números de las preguntas
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showImage, setShowImage] = useState(false); //Visualizar la imagen en pantalla
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const start = 0; // Índice inicial
  const end = 4; // Índice final (exclusivo)
  const [indices, setIndices] = useState(
    Array.from({ length: end - start }, (_, index) => index + start)
  );
  const [handleSort, setHandleSort] = useState(true); //Manejar el desorden de las preguntas
  const { state } = useLocation(); //Traer los datos de props
  const { temario, nivel, preguntas } = state || {}; //Traer los datos y guardarlos en su tabla correspondiente
  const [preguntaActual, setPreguntaActual] = useState(0); //Manejar la pregunta actual
  const numeroPreguntas = preguntas.length; //Manejo del número de preguntas totales
  const [preguntasFalladas, setPreguntasFalladas] = useState([]); // Números de preguntas falladas
  const [idPreguntasFalladas, setIdPreguntasFalladas] = useState([]); // Números de preguntas falladas
  const [preguntasAcertadas, setPreguntasAcertadas] = useState([]); // Números de preguntas acertadass
  const [idPreguntasAcertadas, setIdPreguntasAcertadas] = useState([]); // Números de preguntas falladas
  const [showResult, setShowResult] = useState(false);
  const letters = ["A", "B", "C", "D"];
  const colors = ["#00ff1e", "#eaff00", "#ff9900", "#008cff"];

  // Encriptar el contenido e insertarlo en el local storage para guardar la selección del usuario
  const transformDataToJson = (
    preguntaActual,
    hover,
    respuestaSeleccionada,
    mostrar,
    question,
    answer,
    indices,
    handleSort,
    preguntasAcertadas,
    preguntasFalladas,
    idPreguntasFalladas,
    idPreguntasAcertadas
  ) => {
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
      preguntasFalladas: preguntasFalladas,
      idPreguntasFalladas: idPreguntasFalladas,
      idPreguntasAcertadas: idPreguntasAcertadas,
    };
    //return encryptDataJson(data);
    return JSON.stringify(data);
  };

  useEffect(() => {
    // Recuperar la respuesta seleccionada del Local Storage al cargar la página
    const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
    if (respuestaGuardada) {
      // Si habia una pregunta ya realizada cargarla
      //const jsonResponse = decryptDataJson(respuestaGuardada);
      const jsonResponse = JSON.parse(respuestaGuardada);
      setPreguntaActual(jsonResponse.preguntaActual);
      setHoverEnabled(jsonResponse.hover);
      setRespuestaSeleccionada(jsonResponse.respuestaSeleccionada);
      setMostrarNumeroAleatorio(jsonResponse.mostrarNumeroAleatorio);
      setQuestion(jsonResponse.question);
      setAnswers(jsonResponse.answers);
      setHandleSort(jsonResponse.handleSort);
      setPreguntasAcertadas(jsonResponse.preguntasAcertadas);
      setPreguntasFalladas(jsonResponse.preguntasFalladas);
      setIdPreguntasFalladas(jsonResponse.idPreguntasFalladas);
      setIdPreguntasAcertadas(jsonResponse.idPreguntasAcertadas);
    }
  }, [temario, nivel]);

  // Función callback para refactorizar el código
  const generateMathAnswer = useCallback(
    (callback) => {
      const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
      let jsonResponse = "";
      if (respuestaGuardada) {
        // Compruebo que exista el elemento en el Local Storage
        //jsonResponse = decryptDataJson(respuestaGuardada);
        jsonResponse = JSON.parse(respuestaGuardada);
        if (jsonResponse.mostrarNumeroAleatorio) {
          // Y guardar los estados en caso de tener, si recargas tienes que almacenarlos
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
          respuestaGuardada
            ? jsonResponse.preguntasAcertadas
            : preguntasAcertadas,
          respuestaGuardada
            ? jsonResponse.preguntasFalladas
            : preguntasFalladas,
          respuestaGuardada
            ? jsonResponse.idPreguntasFalladas
            : idPreguntasFalladas,
          respuestaGuardada
            ? jsonResponse.idPreguntasAcertadas
            : idPreguntasAcertadas
        )
      ); // Las guardo en el local storage para evitar que al recargar la página se pierda
    },
    [
      nivel,
      temario,
      hoverEnabled,
      respuestaSeleccionada,
      preguntaActual,
      handleSort,
      indices,
      preguntasAcertadas,
      preguntasFalladas,
      idPreguntasFalladas,
      idPreguntasAcertadas,
    ]
  );

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
      const cleanMethodName = methodName.replace(/\$/g, ""); // Eliminar los símbolos de dólar

      if (methodMap.hasOwnProperty(cleanMethodName)) {
        const { method, args } = methodMap[cleanMethodName];
        if (!mostrarNumeroAleatorio) {
          generateMathAnswer(Matematicas[method](...args));
        }
      }
    }
  }, [
    preguntas,
    preguntaActual,
    hoverEnabled,
    respuestaSeleccionada,
    mostrarNumeroAleatorio,
    temario,
    nivel,
    generateMathAnswer,
  ]);

  const handleAnswer = (event, respuesta, id_pregunta) => {
    //Cuando el usuario selecciona alguna respuesta
    if (respuestaSeleccionada === null) {
      setRespuestaSeleccionada(respuesta);
      setHoverEnabled(false);
      if (respuesta.correcta) {
        setIdPreguntasAcertadas([...idPreguntasAcertadas, id_pregunta]); //Guardar el id_pregunta para generar la eliminar en sección repaso
        setPreguntasAcertadas([...preguntasAcertadas, preguntaActual + 1]);
      } else {
        setIdPreguntasFalladas([...idPreguntasFalladas, id_pregunta]); //Guardar el id_pregunta para generar la sección de repaso
        setPreguntasFalladas([...preguntasFalladas, preguntaActual + 1]);
      }
      const respuestaGuardada = localStorage.getItem(`${temario + nivel}`);
      let jsonResponse = "";
      if (respuestaGuardada) {
        // Compruebo que exista el elemento en el Local Storage
        //jsonResponse = decryptDataJson(respuestaGuardada);
        jsonResponse = JSON.parse(respuestaGuardada);
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
          respuesta.correcta
            ? [...preguntasAcertadas, preguntaActual + 1]
            : [...preguntasAcertadas],
          !respuesta.correcta
            ? [...preguntasFalladas, preguntaActual + 1]
            : [...preguntasFalladas],
          !respuesta.correcta
            ? [...idPreguntasFalladas, id_pregunta]
            : [...idPreguntasFalladas],
          respuesta.correcta
            ? [...idPreguntasAcertadas, id_pregunta]
            : [...idPreguntasAcertadas]
        )
      );
    }
  };

  /* Si la respuesta seleccionada es incorrecta pinta en rojo,
  si la respuesta que queda es correcta puesto que no ha pasado el filtro anterior se pinta en verde tanto haya sido marcada como si no lo ha sido
  */
  const detectarCorrecta = (respuesta) => {
    if (respuestaSeleccionada != null) {
      if (
        !respuesta.correcta &&
        respuesta.respuesta === respuestaSeleccionada.respuesta
      ) {
        return "incorrecta";
      } else if (respuesta.correcta) {
        return "correcta";
      } else {
        return "other";
      }
    }
    return "";
  };

  /* Controlador para seleccionar la respuesta siguiente, si es la última pregunta retorna a la página anterior, 
  si no lo es carga la siguiente pregunta*/
  const handleSiguientePregunta = async () => {
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
        transformDataToJson(
          preguntaActual + 1,
          true,
          null,
          false,
          null,
          [],
          indices,
          true,
          preguntasAcertadas,
          preguntasFalladas,
          idPreguntasFalladas,
          idPreguntasAcertadas
        )
      );
    } else if (temario !== "repaso") {
      try {
        // Guardar las preguntas falladas en la Base de Datos
        const { token, serverIP } = getIpServerAndToken();
        const response = await axios.post(`${serverIP}/game/incorrectas`, {
          token,
          idPreguntasFalladas,
        });
        if (response.status === 200) {
          localStorage.removeItem(`${temario + nivel}`);
          window.location = "/loby";
        }
      } catch (err) {}
    } else {
      try {
        const { token, serverIP } = getIpServerAndToken();
        console.log(idPreguntasAcertadas);
        const response = await axios.delete(
          `${serverIP}/game/preguntas-repaso`,
          {
            data: {},
            params: {
              token: token,
              idPreguntasAcertadas: idPreguntasAcertadas,
            },
          }
        );
        if (response.status === 200) {
          localStorage.removeItem(`${temario + nivel}`);
          window.location = "/loby";
        }
      } catch (err) {}
    }
  };

  function getIpServerAndToken() {
    var users;
    var token;
    var serverIP;
    try {
      users = JSON.parse(localStorage.getItem("user"));
      token = users.token;
      serverIP = jsonData.serverIP;
    } catch (err) {
      window.location = "/";
    }
    return { token, serverIP };
  }

  // Volver a la página anterior
  const back = () => {
    return (
      <Link to="/loby" className="circle">
        <div className="arrow" />
      </Link>
    );
  };

  // Pinta en blanco en caso de no tener 4 respuestas
  const preguntasNivel = (pregunta, value, letter, color) => {
    if (answers.length !== 0 && answers[value])
      pregunta.respuestas[value].respuesta = answers[value];
    if (pregunta.respuestas[value].respuesta !== "") {
      return (
        <button
          key={value}
          className={`respuesta ${
            hoverEnabled ? "respuesta-hover" : ""
          } ${detectarCorrecta(pregunta.respuestas[value])}`}
          onClick={(event) =>
            handleAnswer(
              event,
              pregunta.respuestas[value],
              pregunta.id_pregunta
            )
          }
          disabled={respuestaSeleccionada === null ? false : true}
        >
          <div
            style={{
              backgroundColor: color,
            }}
          >
            {letter}
          </div>
          <p
            style={{
              backgroundColor: color,
            }}
          >
            {pregunta.respuestas[value].respuesta}
          </p>
        </button>
      );
    } else return <></>; //Devolver campo vacio, no hay respuesta
  };

  const ImageContainer = ({ imageUrl, onClose }) => {
    return (
      <div className="image-container">
        <img src={require(`../image/preguntas/${imageUrl}`)} alt="Imagen" />
        <span className="close" onClick={onClose}>
          &times;
        </span>
      </div>
    );
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowImage(true);
  };

  const handleCloseImage = () => {
    setShowImage(false);
    setSelectedImageUrl("");
  };

  const handleResult = () => {
    setShowResult(true);
  };

  const renderResult = () => {
    const porcentajeNota = (preguntasAcertadas.length / numeroPreguntas) * 100;
    const nota = porcentajeNota / 10;
    const color = nota >= 5 ? "green" : "red";
    const textFinal =
      nota >= 5
        ? "¡Muy bien has aprobado!"
        : "¡Vaya! Lo siento, has suspendido.";
    return (
      <div className="resultadoFinal">
        <div>Porcentaje de aciertos:</div>
        <p style={{ borderColor: color, color: color }}>{porcentajeNota}%</p>
        <div>Nota Final:</div>
        <p style={{ borderColor: color, color: color }}>{nota}</p>
        <p>{textFinal}</p>
        <button className="buttonGame" onClick={handleSiguientePregunta}>
          Finalizar
        </button>
      </div>
    );
  };

  const renderPregunta = () => {
    const pregunta = preguntas[preguntaActual];
    if (handleSort) {
      setHandleSort(false);
      setIndices([...indices.sort(() => Math.random() - 0.5)]); //Desordenar los índices
    }
    const filteredIndices = indices.filter(
      (index) => pregunta.respuestas[index].respuesta !== ""
    );
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
    highlightedText =
      highlightedText +
      (pregunta.url_imagen !== null
        ? `<strong class="highlightedBold">${
            temario === "Inglés" ? "(See the picture)" : "(Ver la imagen)"
          }</strong>`
        : "");
    return (
      <div className="mainContainerGame">
        <div className="title-image">
          <div className="title">
            <span dangerouslySetInnerHTML={{ __html: highlightedText }}></span>
          </div>
        </div>
        <div className="respuestas-container">
          {filteredIndices.map((value, index) => {
            const letter = letters[index];
            const color = colors[index];
            return preguntasNivel(pregunta, value, letter, color);
          })}
        </div>
        {respuestaSeleccionada !== null && (
          <div className="siguiente-pregunta">
            {!showResult ? (
              <button className="buttonGame" onClick={handleSiguientePregunta}>
                {preguntaActual + 1 !== numeroPreguntas
                  ? "Siguiente"
                  : "Finalizar"}
              </button>
            ) : (
              <></>
            )}
            {preguntaActual + 1 === numeroPreguntas && !showResult ? (
              <button className="buttonGame" onClick={handleResult}>
                Resultados
              </button>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="loby">
      {back()}

      <BarraHistorial
        preguntaActual={preguntaActual + 1}
        numeroPreguntas={numeroPreguntas}
        preguntasFalladas={preguntasFalladas}
        preguntasAcertadas={preguntasAcertadas}
      >
        {preguntas[preguntaActual].url_imagen !== null ? (
          <button
            className="button-icon"
            onClick={() =>
              handleImageClick(preguntas[preguntaActual].url_imagen)
            }
          >
            <IconoSvg className="icono-svg" />
          </button>
        ) : (
          ""
        )}
        {showImage && (
          <ImageContainer
            imageUrl={selectedImageUrl}
            onClose={handleCloseImage}
          />
        )}
      </BarraHistorial>
      {showResult ? renderResult() : <></>}
      {renderPregunta()}
      <Outlet />
    </main>
  );
}

export default Game;
