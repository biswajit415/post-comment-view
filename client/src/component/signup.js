import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            cnfpassword: '',
            error: ''

        }
    }
    handleChange = (e) => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let dataToSubmit = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,


        }
        if (this.state.password.length < 8) {
            this.setState({ error: "Password Length Shoud be minimum 8" })
        }

        else if (this.state.password === this.state.cnfpassword) {

            axios.post('http://localhost:5000/api/register', dataToSubmit)

                .then(res => {
                    console.log(this.state)
                    if (res.data.success === false) {
                        this.setState({
                            error: res.data.messege
                        })
                    }
                    else
                        window.location = "/login"
                })
        }
        else {
            this.setState({ error: " password are not matched" })
        }


    }




    render() {
        return (
            <div className='container'>
                <h1>Sign Up</h1>

                <form className="col 12" onSubmit={this.onSubmit} >

                    <div className="input field col s12">
                        <div className="row">
                            <label className="Container">Name</label>
                            <input
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                id="name"
                                type="text"

                                required />

                        </div>
                    </div>

                    <div className="input field col s12">
                        <div className="row">
                            <label className="Container">Email</label>
                            <input
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                id="email"
                                type="email"

                                required />

                        </div>
                    </div>
                    <div className="input field col s12">

                        <div className="row">
                            <label> Password</label>
                            <input
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                id="password"
                                type="password"

                                required />

                        </div>

                    </div>

                    <div className="input field col s12">

                        <div className="row">
                            <label> Confirm Password</label>
                            <input
                                name="cnfpassword"
                                value={this.state.cnfpassword}
                                onChange={this.handleChange}
                                id="cnfpassword"
                                type="password"

                                required />

                        </div>
                        {<p color="">{this.state.error}</p>}
                    </div>
                    <div className="row">
                        <button className="waves-effect waves-light btn-large" type="submit">
                            Submit
                            </button >
                            &nbsp;&nbsp;&nbsp;
                        <Link to="/login"  > Go To Login</Link>
                    </div>
                </form>

            </div >
        );
    }
}

export default login;