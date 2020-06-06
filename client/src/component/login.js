import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: ''
        }
    }
    handleChange = (e) => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password,
        }
        if (this.isValid(this.state)) {
            this.setState({ errors: '' })
            axios.post('/api/login', dataToSubmit)
                .then(res => {
                    console.log(res.data)
                    if (res.data.loginSuccess === false) {
                        this.setState({ errors: res.data.message })
                    }
                    else {
                        localStorage.setItem('myId', res.data.userId)
                        window.location = '/'
                    }
                })
                .catch(err => {
                    this.setState({ errors: err })
                    console.log("value=" + err)
                })
        }
        else {
            this.setState({ errors: "Invalid User Or passsword" })
        }

    }

    isValid = ({ email, password }) => email && password;


    render() {

        return (
            <div className='container'>
                <h1>Login</h1>

                <form className="col 12" onSubmit={this.onSubmit} >
                    <div className="input field col s12">
                        <div className="row">
                            <label className="Container">Email</label>
                            <input
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                id="email"
                                type="email"
                                className="validate"
                            />

                        </div>
                    </div>
                    <div className="input field col s12">
                        <div className="row">
                            <input
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                id="password"
                                type="password"
                                className="validate"
                            />
                            <label>Password</label>
                        </div>


                    </div>
                    {this.state.errors != '' &&
                        <p>
                            {this.state.errors}
                        </p>
                    }

                    <div className="row">
                        <a><button className="waves-effect waves-light btn-large" type="submit" >
                            Login
                            </button ></a>&nbsp;&nbsp;&nbsp;
                        <a>
                            <Link to="/signup" className="waves-effect waves-light btn-large">Sign Up</Link>
                        </a>
                    </div>
                </form>

            </div >
        );
    }
}

export default login;