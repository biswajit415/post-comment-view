import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar'
class comment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            post: '',
            comment: [],
            myComment: ''
        }

    }

    componentDidMount() {

        axios.get('/api/fetch-post/' + this.props.match.params.id + '/' +
            localStorage.getItem('myId'))
            .then(res => {
                if (res.data.authentication === false) {
                    window.location = "/login"
                    return
                }
                this.setState({
                    id: this.props.match.params.id,
                    name: res.data.name,
                    post: res.data.post,
                    comment: res.data.comment.map(data => data)
                })
                console.log(res.data)

            })
    }
    handleChange = (e) => {

        this.setState({
            myComment: e.target.value,
        })


    }
    submitPost = (e) => {
        var dataToSubmit = {
            myId: localStorage.getItem('myId'),
            id: this.state.id,
            comment: this.state.myComment
        }

        axios.post('/api/add-comment/' + localStorage.getItem('myId'), dataToSubmit).
            then(res => {
                window.location = `/addComment/${this.state.id}`
            })


    }


    render() {

        var postedItem = this.state.comment.map((data) =>

            <ul className="collection">

                <li className="collection-item avatar">
                    <i className="material-icons circle">comment</i>
                    <span className="title">{data.name}</span>
                    <p>{data.comment} </p>
                </li>
            </ul>
        )



        return (
            <div>
                <Navbar />
                <div className="container">

                    <div className="row">

                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">{this.state.name}</span>
                                <p>{this.state.post}</p>
                            </div>
                            <div className="card-action">
                            </div>
                        </div>

                        <div>
                            <textarea style={{ height: "50px" }}
                                name="post"
                                value={this.state.myComment}
                                onChange={this.handleChange}
                                id="post"
                                type="text"
                            />
                            <button className="waves-effect green btn-small" type="submit"
                                onClick={this.submitPost}>
                                Post
                            </button >

                        </div>
                        <div>
                            {postedItem}
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

export default comment;