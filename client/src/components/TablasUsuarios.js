import React from "react";

function TablasUsuarios({ data }) {
  return (
    <div>
      {Object.keys(data).map((username) => (
        <div key={username}>
          <h3 style={{ marginLeft: "5px" }}>Usuario: {username}</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Pregunta Fallada</th>
                <th>Nivel</th>
                <th>Temario</th>
              </tr>
            </thead>
            <tbody>
              {data[username].map((item, index) => (
                <tr key={index}>
                  <td>{item.pregunta}</td>
                  <td>{item.nivel}</td>
                  <td>{item.temario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TablasUsuarios;
