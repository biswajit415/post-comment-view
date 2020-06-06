import React, { Component } from 'react';
import Navbar from './navbar'
class Home extends Component {
    componentDidMount() {
        if (!localStorage.getItem('myId'))
            window.location = "/login"
    }
    render() {
        return (
            <div>

                <Navbar />
                <div className="container">
                    <h2>Welcome to post comment view Application</h2>

                </div>

            </div>
        );
    }
}

export default Home;