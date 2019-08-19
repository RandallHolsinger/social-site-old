import React, {Component} from 'react';
import './Home.css'
import axios from 'axios';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import "react-bulma-components/dist/react-bulma-components.min.css";


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            comments: [],
            postInput: '',
            commentInput: '',
            post_id: 0,
            showComments: false
        }

        this.handlePost = this.handlePost.bind(this)
        this.handleComment = this.handleComment.bind(this)
        this.toggleComment = this.toggleComment.bind(this)

    }

    componentDidMount() {
        this.getPosts()
        this.getComments()
    }
    getPosts = () => {
        axios.get(`/api/getPosts`).then(res => {
            this.setState({
                posts: res.data
            })
            console.log(res)
        })
    }
    
    addPost = () => {
        const {postInput} =  this.state
        axios.post(`/api/addPost`, {postInput})
        this.getPosts()
    }

    getComments = () => {
        const {post_id} = this.state
        axios.get(`/api/comments/${post_id}`).then(res => {
            this.setState({
                comments: res.data
            })
        })
    }

    addComment = () => {
        const {post_id, commentInput} = this.state
        axios.post(`/api/comment`, {post_id, commentInput})
        this.getComments()
    }

    handleComment(e) {
        this.setState({
            commentInput: e.target.value
        })
    }
  
    
    handlePost(e) {
        this.setState({
            postInput: e.target.value
        })
    }

    togglePostId(post_id){
        this.setState({
            post_id: post_id
        })
        console.log(this.state)
    }

    toggleComment() {
        this.setState({
            showComments: !this.state.showComments
        })
        this.getComments()
    }
    
    
    render() {
        
       let mappedPosts = this.state.posts.map(post => {
           return (
               <div key={post.post_id} onClick={() => this.togglePostId(post.post_id)} className='home-posts' >
               <article className="media">
  <figure className="media-left">
    <p className="image is-64x64">
      <img src={post.profile_img} alt='profile'/>
    </p>
  </figure>
  <div className="media-content">
    <div className="content">
      <p>
      <Link to={`/post/${post.post_id}`}><strong>{post.username}</strong></Link> <small>{post.email}</small> <small>31m</small>
        <br/>
        {post.post}
      </p>
    </div>
    <nav className="level is-mobile">
      <div className="level-left">
        <button onClick={() => this.toggleComment()}className="level-item">
          <span className="icon is-small"><i className="fas fa-reply"></i></span>
        </button>
      
      </div>
    </nav>
  </div>
</article>
{this.state.showComments ? <div>
<input
    className='comment-input'
    value={this.state.commentInput}
    onChange={this.handleComment}
    placeholder='comment here'
  />  
<button className='add-comment-btn' onClick={() => this.addComment()}>Add Comment</button>
{this.state.comments.map(comment => {
    return (
<article class="media" key={comment.comment_id}>
      <figure class="media-left">
        <p class="image is-48x48">
          <img src={comment.profile_img} alt='profile'/>
        </p>
      </figure>

      <div class="media-content">
        <div class="content">
          <p>
            <strong>{comment.username}</strong>
            <br/>
            {comment.comment}
            <br/>
            {/* <small><a>Like</a> · <a>Reply</a> · 2 hrs</small> */}
          </p>
        </div>
     </div>
     </article> 
     
    )
})
    }
               
                 
               
                 
    
               
         </div> : null }      
        </div>
       )
    })
        return (
            <div className='Home'>
              <Header />
              add a post
              <input 
                 className='post-input'
                 value={this.state.postInput}
                 onChange={this.handlePost}
                 placeholder='post text here'
               />
               <button className='post-btn' onClick={() => this.addPost()}>Post</button>
              <div>
              {mappedPosts}
  
              {/* {mappedComments} */}
              </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user_id,
        reduxState
    }
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)