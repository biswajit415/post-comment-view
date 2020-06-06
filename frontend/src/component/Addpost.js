import axios from 'axios';
import Navbar from './navbar'
import React, { Component } from 'react';

class Addpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: ''
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('myId'))
            window.location = "/login"
    }
    handleChange = (e) => {
        this.setState({ post: e.target.value })
    }
    submitPost = (e) => {
        e.preventDefault();
        var dataToSubmit = {
            id: localStorage.getItem('myId'),
            post: this.state.post
        }
        //console.log(dataToSubmit)
        axios.post('http://localhost:5000/api/add-post/' + localStorage.getItem('myId'), dataToSubmit)
            .then(res => {
                if (res.data.authentication === false)
                    window.location = "/login"
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })


    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <br />
                    <br />
                    <h1>Writer Your Post </h1>
                    <br /><textarea style={{ height: "200px" }}
                        name="post"
                        value={this.state.post}
                        onChange={this.handleChange}
                        id="post"
                        type="text"
                    />
                    <button className="waves-effect blue btn-large" type="submit"
                        onClick={this.submitPost}>
                        Post
                            </button >


                </div>

            </div>



        );
    }
}

export default Addpost;