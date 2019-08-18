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

    

    

    render() {
        const {post} =  this.state
        
        return (
            <div className='Post'>
            <p>Single Post</p>
              <p>{post.post_id}</p>
              <p>{post.post}</p>
              <p>{post.likes}</p>
              <h2>Leave A Comment</h2>
          
             
              
            </div>
        )
    }
}

export default Post