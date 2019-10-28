 import React, {Component} from 'react';
 import axios from 'axios';
 import Header from '../Header/Header'
 import {Link} from 'react-router-dom'


 class Messages extends Component {
     constructor(props) {
         super(props)

         this.state = {
             user: {},
             messages: [],
             friends: [],
         }
     }

     componentDidMount() {
         this.getUser()
         this.getFriends()
     }
     
     getFriends = () => {
        axios.get(`/api/friends`).then(res => {
            this.setState({
                friends: res.data
            })
        })
     }

     getUser = () => {
         axios.get(`/api/user/profile`).then(res => {
             this.setState({
                 user: res.data[0]
             })
             console.log(res)
         })
     }

     getMessages = () => {
        axios.get(`/api/user/messages`).then(res => {
            this.setState({
                messages: res.data
            })
        })
     }
     
     
     
     render() {
         let mappedFriends = this.state.friends.map(friend => {
             return (
                <Link to={`/user/message/${friend.friend_id}`}>
                 <div className='messages-friends' key={friend.friend_id}>
                   <img src={friend.profile_img} alt='profile' style={{width:'30px'}}/>
                   <p>{friend.username}</p>
                 </div>
                 </Link>
             )
         })

         let mappedMessages = this.state.messages.map(message => {
             return (
                 <div key={message.message_id}>
                     <img src={message.profile_img} alt='profile' style={{width:'30px'}}/>
                     <p>{message.username}</p>
                     <p>{message.message}</p>
                 </div>
             )
         })
         const {user} = this.state
         return (
             <div className='Messages'>
               <Header />
               <h1>User</h1>
               <img src={user.profile_img} alt='profile' style={{width: '100px', borderRadius: '100%'}}/>
               <p>{user.username}</p>
               <p>{user.about_me}</p>
               <h1>Friends</h1>
               {mappedFriends}
               <h1>Messages</h1>
               {mappedMessages}
            </div>
         )
     }
 }

 export default Messages