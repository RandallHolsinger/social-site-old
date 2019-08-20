import React, {Component} from 'react';
import './PersonalProfile.css';
import Header from '../Header/Header';
import axios from 'axios';

class PersonalProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user:  {},
            posts: [],
            friends: [],
            pendingFriends: [],
            aboutInput: '',
            showAbout: false
        }

        this.handleAbout = this.handleAbout.bind(this)
    }

    
    componentDidMount() {
      this.getUserProfile()
      this.getUserPosts()
      this.getUserFriends()
      this.getUserFriendRequests()
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

    getUserFriends = () => {
        axios.get(`/api/friends`).then(res => {
            this.setState({
                friends: res.data
            })
        })
    }

    getUserFriendRequests = () => {
        axios.get(`/api/friends/pending`).then(res => {
            this.setState({
                pendingFriends: res.data
            })
        })
    }

    confirmRequest = () => {
        axios.put(`/api/friends/confirmed`).then(() => {
            alert('friend request accepted')
        })
        this.getUserFriendRequests()
        this.getUserFriends()
    }

    submitAbout = () => {
        const {aboutInput} = this.state
        axios.put(`/api/user/about`, {aboutInput}).then(() => {
            alert('about updated')
        })
        this.showAbout()
        this.getUserProfile()
    }


    handleAbout(e) {
        this.setState({
            aboutInput: e.target.value
        })
    }

    showAbout = () => {
        this.setState({
            showAbout: !this.state.showAbout
        })
    }
    


    render() {
        const {user} = this.state

        let friendRequests = this.state.pendingFriends.map(friend => {
                return (
                    <div key={friend.friend_id} className='friend-request-wrapper'>
                        <p>friend Requests</p>
                         
                        <button onClick={() => this.confirmRequest}>Confirm</button>
                    </div>
                )
        })
        
        let mappedFriends =  this.state.friends.map(friend => {
            return (
                <div key={friend.friend_id}>
                   <p>friends</p>
                </div>
            )
        })

        let mappedPosts = this.state.posts.map(posts => {
            return (
                <div key={posts.post_id} className='personal-posts-wrapper'>
                    <img src={user.profile_img} alt='profile' style={{width: '40px', borderRadius: '100%'}}/>
                    <p>{user.username}</p>
                    <p>{posts.post}</p>
                </div>
            )
        })
        return (
            <div className='PersonalProfile'>
             <Header />
             <h1 style={{color:'white'}}>Personal User</h1>
             <div className='personal-user-wrapper'>
               <img src={user.profile_img} alt='profile' style={{width: '100px', borderRadius: '100%'}}/>
               <p>{user.username}</p>
               <p>About Me:</p>
               <p>{user.about_me}</p>
               {this.state.showAbout ? <div>
               <input
                 className='about-input'
                 value={this.state.aboutInput}
                 onChange={this.handleAbout}
                 placeholder='about me'
               />
               <button onClick={() => this.submitAbout()}>Submit</button>
               <button onClick={() => this.showAbout()}>Cancel</button>
               </div> : <div>
               <button onClick={() => this.showAbout()}>Edit</button>
               </div>
               }
               </div>
               <p></p>
               <h1 style={{color:'white'}}>Personal Posts</h1>
               {mappedPosts}
               {mappedFriends}
               {friendRequests}
            </div>
        )
    }
}

export default PersonalProfile