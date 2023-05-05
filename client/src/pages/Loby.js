import React, { Component } from "react";
import "../styles/app/loby.css";
import { Outlet, Link } from 'react-router-dom';

const Nivel = ({ num, value }) => (
    <Link to={"/game"} state= {{value: value}} className="label" key={`nivel-${num / 10}`}>
      {num}
    </Link>
);

class Loby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: 500
        }
    }

    niveles() {
        const nuevosNiveles = [];
        let grupoActual = [];

        for (let i = 1; i <= this.state.labels; i++) {
            grupoActual.push(<Nivel num={i} value={`value1-${i}`}/>);
            if (i % 10 === 0) {
                nuevosNiveles.push(
                  <div className="grupo" key={`grupo-${i / 10}`}>
                    {grupoActual}
                  </div>
                );
                grupoActual = [];
            }
        }

        if (grupoActual.length > 0) {
            nuevosNiveles.push(
              <div className="grupo" key={`grupo-${nuevosNiveles.length + 1}`}>
                {grupoActual}
              </div>
            );
          }

        return nuevosNiveles;
    }
    
    render() {
        return(
            <main className="loby">
                <div className="mainContainer">
                    {this.niveles()}
                </div>
                <Outlet/>
            </main>
        )
    }
}

export default Loby;