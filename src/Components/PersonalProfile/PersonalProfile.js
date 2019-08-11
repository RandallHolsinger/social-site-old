import React, {Component} from 'react';
import './PersonalProfile.css';
import Header from '../Header/Header';
import axios from 'axios';

class PersonalProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user:  {},
            posts: []
        }
    }

    
    componentDidMount() {
      this.getUserProfile()
      this.getUserPosts()
    }

    getUserProfile = () => {
        axios.get(`/api/user/profile`).then(res => {
            this.setState({
                user: res.data[0]
            })
        })
    }

    getUserPosts = () => {
        axios.get(`/api/user/posts`).then(res => {
            this.setState({
                posts: res.data
            })
        })
    }
    


    render() {
        const {user} = this.state
        let mappedPosts = this.state.posts.map(posts => {
            return (
                <div key={posts.post_id} style={{border: '1px solid white', marginTop: '30px'}}>
                    <img src={user.profile_img} alt='profile' style={{width: '40px', borderRadius: '100%'}}/>
                    <p>{user.username}</p>
                    <p>{posts.post}</p>
                </div>
            )
        })
        return (
            <div className='PersonalProfile'>
             <Header />
               <img src={user.profile_img} alt='profile' style={{width: '100px', borderRadius: '100%'}}/>
               <p>{user.username}</p>
               <p></p>
               {mappedPosts}
            </div>
        )
    }
}

export default PersonalProfile