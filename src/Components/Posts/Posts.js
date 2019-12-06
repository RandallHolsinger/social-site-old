import React, {Component} from 'react';
import './Posts.css';
import axios from 'axios';
import Comments from '../Comments/Comments';
import {connect} from 'react-redux';

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            postInput: '',
            showAddPost: false,
            ShowComments: false
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    addPost = () => {
        let data = this.state.postInput
       axios.post(`/api/addPost`, {data}).then(() => {
           this.getPosts()
       })
    }

    getPosts = () => {
        axios.get(`/api/getPosts`).then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    deletePost = (post_id) => {
        axios.delete(`/api/post/delete/${post_id}`).then(() => {
            alert('post deleted')
            this.getPosts()
        })
    }

    toggleShowPosts = () => {
        this.setState({
            showAddPost: !this.state.showAddPost
        })
    }

    handlePostInput= (e) => {
        this.setState({
            postInput: e.target.value
        })
    }

    toggleShowComments = () => {
        this.setState({
            ShowComments: !this.state.ShowComments
        })
    }



    render() {

        let mappedPosts = this.state.posts.map(post => {
            return (
                <div key={post.post_id} className='posts-wrapper'>
                    <img src={post.profile_img} alt='profile'/>
                    <p>{post.username}</p>
                    <p>{post.post}</p>
                    <p>{post.user_id}</p>
                    {this.props.user_id === post.user_id ?
                    <div>
                        <button onClick={() => this.deletePost(post.post_id)}>Delete</button>
                    </div> : null
                    }
                    <i onClick={() => this.toggleShowComments()}className ='fas fa-comment'></i>
                    {this.state.ShowComments ?
                    <div className='comments-wrapper'>
                       <Comments postId={post.post_id} />
                    </div> : null
                    }
                </div>
            )
        })

        return(
            <div className='Posts'>
                {this.state.showAddPost ? 
                 <div>
                    <input
                     onChange={this.handlePostInput}
                     value={this.state.postInput}
                     type='text'
                     placeholder='What are you thinking?'
                    />
                    <button onClick={() => this.addPost()}>Add Post</button> 
                </div>
               : <div>
                   <button onClick={() => this.toggleShowPosts()}>Create Post</button>
                 </div>
                }
               {mappedPosts}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user_id,
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)