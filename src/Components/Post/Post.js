import React, {Component} from 'react';
import axios from 'axios';

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: {},
            comments: [],
            commentInput: ''
        }
       this.handleComment = this.handleComment.bind(this);
    }

    componentDidMount() {
      this.getPost()
      this.getComments()
    }

    getPost = () => {
        axios.get(`/api/post/${this.props.match.params.post_id}`).then(res => {
            this.setState({
                post: res.data[0]
            })
        })
    }

    getComments = () => {
        axios.get(`/api/comments/${this.props.match.params.post_id}`).then(res => {
            this.setState({
                comments: res.data
            })
        })
    }

    addComment = () => {
        const {post_id} = this.state.post
        const {commentInput} = this.state
        axios.post(`/api/comment/${post_id}`, {commentInput})
        this.getComments()
    }

    handleComment(e) {
        this.setState({
            commentInput: e.target.value
        })
    }

    

    render() {
        const {post} =  this.state
        let mappedComments =  this.state.comments.map(comment => {
            return (
                <div key={comment.comment_id}>
                      <p>{comment.comment}</p>
                </div>
            )
        })
        return (
            <div className='Post'>
            <p>Single Post</p>
              <p>{post.post_id}</p>
              <p>{post.post}</p>
              <p>{post.likes}</p>
              <h2>Leave A Comment</h2>
              {mappedComments}
              <input
                className='comment-input'
                value={this.state.commentInput}
                onChange={this.handleComment}
                placeholder='comment here'
              />
              <button className='add-comment-btn' onClick={() => this.addComment()}>Add Comment</button>
            </div>
        )
    }
}

export default Post