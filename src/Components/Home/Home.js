import React, {Component} from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            postInput: ''
        }

        this.handlePost = this.handlePost.bind(this)
    }s

    componentDidMount() {
        this.getPosts()
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
  
    
    handlePost(e) {
        this.setState({
            postInput: e.target.value
        })
    }
    
    
    render() {
       let mappedPosts = this.state.posts.map(post => {
           return (
               <div key={post.post_id} style={{border:'1px solid black', backgroundColor:'white', width:'50%'}}>
               <Link to={`/post/${post.post_id}`}>
                 <img style={{width:'30px', height:'30px', borderRadius:'100%'}} src={post.profile_img} alt='profile img'/>
                 <p>{post.username}</p>
                 <p>{post.post}</p>
                 <hr/>
                 <button>Like</button>
                </Link>
               </div>
           )
       })
        return (
            <div className='Home'>
              <Header />
              {mappedPosts}
              add a post
              <input 
                 className='post-input'
                 value={this.state.postInput}
                 onChange={this.handlePost}
                 placeholder='post text here'
               />
               <button className='post-btn' onClick={() => this.addPost()}>Post</button>
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