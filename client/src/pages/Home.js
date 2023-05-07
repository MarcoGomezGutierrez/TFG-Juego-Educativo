import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";

class Home extends Component {

    constructor(props) {
        super(props);
        try {
            const users = JSON.parse(localStorage.getItem("user"));
            const token = users.token;
            axios.post('http://localhost:8080/app/loby', {
                token
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data.msg);
                        window.location = "./loby";
                    } else {
                        console.log(response.data.msg);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err);
        }

    }

    render() {
        return (
            <Layout>
                <div> Home </div>
            </Layout>
        )
    }
}

export default Home;