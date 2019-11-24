 import React, {Component} from 'react';
 import './Messages.css'
 import axios from 'axios';
 import Header from '../Header/Header'


 class Messages extends Component {
     constructor(props) {
         super(props)

         this.state = {
             user: {},
             messages: [],
             friendMessages: [],
             friends: []
         }
     }

     componentDidMount() {
         this.getUser()
         this.getFriends()
         this.getMessages()
     }
     
     getFriends = () => {
        axios.get(`/api/friends`).then(res => {
            this.setState({
                friends: res.data
            })
            console.log('get friends', res.data)
        })
     }

     getUser = () => {
         axios.get(`/api/user/profile`).then(res => {
             this.setState({
                 user: res.data[0]
             })
         })
     }

     getMessages = () => {
        axios.get(`/api/user/messages`).then(res => {
            this.setState({
                messages: res.data
            })
        })
     }

    getFriendMessages = (friend_id) => {
        axios.get(`/api/friend/messages`, {friend_id}).then(res => {
            this.setState({
                friendMessages: res.data
            })
        })
    }   
     
     render() {
         let mappedFriends = this.state.friends.map(friend => {
             return (
                 <div key={friend.friend_id} onClick={this.getFriendMessages(friend.friend_id)} className='messages-friends-wrapper'>
                   <img src={friend.profile_img} alt='profile' style={{width:'30px'}}/>
                   <p>{friend.username}</p>
                 </div>
             )
         })

         let mappedMessages = this.state.messages.map(message => {
             return (
                 <div key={message.message_id} className='messages-wrapper'>
                 <img src={message.profile_img} alt='profile' style={{width: '50px', height:'50px'}}/>
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