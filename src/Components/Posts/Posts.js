import React, {Component} from 'react';
import './Posts.css';
import axios from 'axios';
import Comments from '../Comments/Comments';
import {connect} from 'react-redux';
import "react-bulma-components/dist/react-bulma-components.min.css";
import {Media, Image, Content, Button, Level, Section, Box} from 'react-bulma-components/dist'


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
           this.setState({
               postInput: ''
           })
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
        axios.delete(`/api/post/${post_id}`).then(() => {
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

    



    render() {

        let mappedPosts = this.state.posts.map(post => {
            return (
               <div key={post.post_id}>
                <Section>
                  <Box>
                    <Media>
                      <Media.Item renderAs="figure" position="left">
                        <Image size={64} alt="64x64" src={post.profile_img} />
                      </Media.Item>
                      <Media.Item>
                        <Content>
                          <p>
                            <strong>{post.username}</strong> <small>{post.email}</small> <small>31m</small>
                            <br />
                            {post.post}
                          </p>
                        </Content>
                        <Level breakpoint="mobile">
                          <Level.Side align="left">
                            <Button className='far fa-comment'>Comment</Button>
                            <Button className='far fa-thumbs-up'>Like</Button>
                            {this.props.user_id === post.user_id ?
                             <div>
                               <Button onClick={() => this.deletePost(post.post_id)}>Delete</Button>
                             </div> : null
                            }
                           <div className='comments-wrapper'>
                             <Comments postId={post.post_id} />
                           </div>
                          </Level.Side>
                        </Level>
                      </Media.Item>
                    </Media>
                  </Box>
                </Section>
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