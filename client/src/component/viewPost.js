import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './navbar'
class viewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AllPost: []
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('myId')) {
            window.location = "/login"
            return
        }
        axios.get('/api/view-post/' + localStorage.getItem('myId')).
            then(res => {
                console.log(res.data);
                if (res.data.authentication === false) {
                    window.location = "/login"
                    return
                }
                this.setState({
                    AllPost: res.data.map(post => post)

                })

                console.log(this.state);
            })
            .catch(err => { throw err })
    }
    render() {
        var Items = this.state.AllPost.map((data) =>
            <div className="container">
                <div class="row">

                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{data.name}</span>
                            <p>{data.post}</p>
                        </div>
                        <div className="card-action">
                            <a>
                                <Link to={"/addComment/" + data._id} className="waves-effect waves-light btn-small">Comment</Link></a>

                        </div>
                    </div>

                </div>
            </div>
        )
        return (
            <div>
                <Navbar />
                {Items}
            </div>
        );
    }
}

export default viewPost;