import React, {Component} from 'react';
import './Posts.css';
import axios from 'axios';

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            postInput: ''
        }

        this.handlePostInput = this.handlepostInput.bind(this);
    }

    componentDidMount() {
       this.getPosts()
    }

    getPosts = () => {
        axios.get(`/api/getPosts`).then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    handlepostInput(e) {
       this.setState({
           postInput: e.target.value
       })
    }

    addThread = () => {
           const {postInput} = this.state
           let body = {postInput}
            axios.post(`/api/addPost`, {body}).then(res => {
                this.setState({
                    threads: res.data
                })   
            })
    }
    

    render() {
        var mappedPosts = this.state.posts.map(post => {
            return (
               <div>
                   
               </div>
            )
        })
        return (
            <div className='Posts'>
              Threads
    
              <input
                className='thread-input'
                onChange={this.handlepostInput}
                value={this.state.postInput}
                placeholder='text'
              
              />
              <button className='add-post-btn' onClick={()=>this.addPost()}>Add Post</button>
              {mappedPosts}
            </div>
        )
    }
}

export default Posts