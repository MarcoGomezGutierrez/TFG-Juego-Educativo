import React, { Component } from "react";
import Layout from "../components/Layout";

class Verification extends Component {
  render() {
    return (
      <Layout>
        <p>
          Por favor, entre en su correo y verifique que eres el propietario de
          la cuenta. Tienes 1 hora hasta que caduque.
        </p>
      </Layout>
    );
  }
}

export default Verification;
