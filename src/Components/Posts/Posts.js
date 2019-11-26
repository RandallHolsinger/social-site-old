import React, {Component} from 'react';
import './Posts.css'
import axios from 'axios'

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            postInput: '',
            showAddPost: false
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    addPost = () => {
        let data = this.state.postInput
       axios.post(`/api/addPost`, {data}).then(() => {
           alert('Post Added')
           this.getPosts()
       })
    }

    getPosts = () => {
        axios.get(`/api/getPosts`).then(res => {
            this.setState({
                posts: res.data
            })
            console.log('posts', res.data)
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


    render() {

        let mappedPosts = this.state.posts.map(post => {
            return (
                <div key={post.post_id} className='posts-wrapper'>
                    <img src={post.profile_img} alt='profile'/>
                    <p>{post.username}</p>
                    <p>{post.post}</p>
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

export default Posts