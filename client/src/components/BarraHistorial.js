import React from "react";
import "../styles/app/game.css";

/**
 * Historial de avance de las preguntas
 * @param {*} preguntaActual
 * @param {*} numeroPreguntasRestantes
 * @returns
 */
const BarraHistorial = ({
  preguntaActual,
  numeroPreguntas,
  preguntasFalladas,
  preguntasAcertadas,
  children,
}) => {
  const renderBolitas = () => {
    const bolitas = [];

    for (let i = 1; i <= numeroPreguntas; i++) {
      // Determinar el estilo CSS de la bolita
      const bolitaStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        width: "15px",
        height: "15px",
        margin: "10px 5px",
      };

      // Verificar si la pregunta fue fallada
      if (preguntasFalladas.includes(i)) {
        bolitaStyle.backgroundColor = "red";
      }
      // Verificar si la pregunta fue acertada
      if (preguntasAcertadas.includes(i)) {
        bolitaStyle.backgroundColor = "green";
      }
      // Verificar si es la pregunta actual
      if (i === preguntaActual) {
        bolitaStyle.border = "3px solid black";
      }

      bolitas.push(<div key={i} style={bolitaStyle}></div>);
    }

    return bolitas;
  };

  return (
    <div className="bolitas">
      {renderBolitas()}
      {children}
    </div>
  );
};

export default BarraHistorial;
