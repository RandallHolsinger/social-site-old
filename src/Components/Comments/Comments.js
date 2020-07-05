import React, {Component} from 'react';
import './Comments.css'
import axios from 'axios';
import "react-bulma-components/dist/react-bulma-components.min.css";
import {Media, Image, Content, Button, Level, Section, Box, Textarea, Field, Control} from 'react-bulma-components/dist'

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: [],
            commentInput: '',
            showComments: false
        }
    }

    componentDidMount() {
        this.getCommentsFromPost()
    }

    getCommentsFromPost = () => {
        axios.get(`/api/comments/${this.props.postId}`).then(res => {
            this.setState({
                comments: res.data
            })
        })
    }

    addCommentToPost = () => {
        const {postId} = this.props
        const {commentInput} = this.state
        axios.post(`/api/comment/add`, {postId, commentInput}).then(() => {
            this.getCommentsFromPost()
            this.clearInput()
        })
    }


    handleCommentInput = (e) => {
        this.setState({
            commentInput: e.target.value
        })
    }

    toggleShowComments = () => {
        this.setState({
            showComments: !this.state.showComments
        })
    }

    clearInput = () => {
        this.setState({
            commentInput: ''
        })
    }
    
    render() {
        let mappedComments =  this.state.comments.map(comment => {
            return (
                <div key={comment.comment_id}>
                   <img src={comment.profile_img} alt='profile' style={{width: '20px', height: '20px'}}/>
                   <p>{comment.username}</p>
                   <p>{comment.comment}</p>
                </div>
            )
        })
        return(
            <div>
                 <i onClick={() => this.toggleShowComments()} className ='fas fa-comment'></i>
                 {this.state.showComments ?
                  <div>
                      <form onSubmit={this.addCommentToPost} className='comment-form'>
                        <input 
                          onChange={this.handleCommentInput}
                          value={this.state.commentInput}
                          type='text'
                          placeholder='Write a comment...'
                        />
                        <button type='submit'>Post Comment</button>
                      </form>
                      {mappedComments}
                  </div> : null
                 }
             </div>
        )
    }
}

export default Comments