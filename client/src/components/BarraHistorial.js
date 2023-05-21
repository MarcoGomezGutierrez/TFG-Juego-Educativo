import React from 'react';

/**
 * Historial de avance de las preguntas
 * @param {*} preguntaActual
 * @param {*} numeroPreguntasRestantes
 * @returns 
 */
const BarraHistorial = ({ preguntaActual, numeroPreguntas, preguntasFalladas, preguntasAcertadas  }) => {
  const renderBolitas = () => {
    const bolitas = [];

    for (let i = 1; i <= numeroPreguntas; i++) {
      
      // Determinar el estilo CSS de la bolita
      const bolitaStyle = {
        backgroundColor: '#e0e0e0',
        borderRadius: '50%',
        width: '10px',
        height: '10px',
        margin: '10px 5px',
        border: '2px solid transparent'
      };

      // Verificar si la pregunta fue fallada
      if (preguntasFalladas.includes(i)) {
        bolitaStyle.backgroundColor = 'red';
      }
      // Verificar si la pregunta fue acertada
      if (preguntasAcertadas.includes(i)) {
        bolitaStyle.backgroundColor = 'green';
      }
      // Verificar si es la pregunta actual
      if (i === preguntaActual) {
        bolitaStyle.border = '2px solid black';
      }

      bolitas.push(<div key={i} style={bolitaStyle}></div>);
    }

    return bolitas;
  };

  return <div style={{display: "flex", flexDirection:"row", justifyContent: "center"}}>{renderBolitas()}</div>;
};

export default BarraHistorial;