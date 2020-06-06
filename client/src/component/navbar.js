import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }

    }
    loggedout = () => {

        axios.get('/api/logout/' + localStorage.getItem('myId'))
            .then(res => {
                console.log(res.data)
                if (res.data.success == true) {
                    window.location = '/login'
                    localStorage.removeItem('myId')
                }
            })
    }


    render() {
        return (

            <div className='container'>
                <nav>
                    <div className="nav-wrapper">

                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            <li>  <Link to="/addPost" className="nav-link ml-auto">Add Post</Link></li>
                            <li>  <Link to="/viewPost" className="nav-link ml-auto">View Post</Link></li>
                            <li> <a className="nav-link ml-auto" onClick={this.loggedout}> logOut</a></li>
                        </ul>
                    </div>
                </nav>
            </div>



        );
    }


}
export default Navbar;