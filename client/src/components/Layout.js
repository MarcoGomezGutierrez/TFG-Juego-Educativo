import React, { Component } from "react";
import Header from './Header';
/*import Footer from './Footer';*/
import "../styles/layout/layout.css";


class Layout extends Component {

    render() {
        return (
        <main className="layout">
            <Header/>
            <div className="children">
                {this.props.children}
            </div>
            {/*<Footer/>*/}
        </main>
        );
    }
  
}

export default Layout;