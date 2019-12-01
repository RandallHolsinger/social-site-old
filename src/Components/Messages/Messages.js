 import React, {Component} from 'react';
 import './Messages.css'
 import axios from 'axios';
 import Header from '../Header/Header';
 import Message from '../Message/Message'

 class Messages extends Component {
     constructor(props) {
         super(props)

         this.state = {
             user: {},
             messages: [],
             messageInput:'',
             subjectInput: '',
             friends: [],
             friendId: 0,
             activeIndex: 0,
             showMessageModal: false,
             toggleFriendDropdown: false,
             selectedFriendUsername: '',
             selectFriendId: 0
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

    getFriendMessages = (friendUserId, index) => {
        this.toggleFriendActive(index)
        console.log('friend user_id', friendUserId)
        axios.get(`/api/friend/messages/${friendUserId}`).then(res => {
            this.setState({
                messages: res.data
            })
        })
    }   

    sendMessage = (user_id2, subject, message) => {
        axios.post(`/api/message/send`, {user_id2, subject, message}).then(() => {
            this.getMessages()
            this.showMessageModal()
        })
    }

    toggleFriendActive = (index) => {
        console.log(index)
        this.setState({
           activeIndex: index
        })
    }

    showMessageModal = () => {
        this.setState({
            showMessageModal: !this.state.showMessageModal
        })
    }

    toggleFriendDropdown = () => {
        this.setState({
            toggleFriendDropdown: !this.state.toggleFriendDropdown
        })
    }

    updateSelectedFriend = (username, id) => {
        this.setState({
            selectedFriendUsername: username,
            selectFriendId: id
        })
        this.toggleFriendDropdown()
    }

    handleSubject = (e) => {
        this.setState({
            subjectInput: e.target.value
        })
    }

    handleMessage = (e) => {
        this.setState({
            messageInput: e.target.value
        })
    }
     
     render() {
         let mappedFriends = this.state.friends.map(friend => {
             return (
                 <div key={friend.friend_id} onClick={() => this.getFriendMessages(friend.user_id, friend.friend_id)} className={this.state.activeIndex === friend.friend_id ? 'messages-friends-wrapper active' : 'messages-friends-wrapper'}>
                   <img src={friend.profile_img} alt='profile' style={{width:'30px'}}/>
                   <p>{friend.username}</p>
                 </div>
             )
         })

         let mappedSelectedFriends = this.state.friends.map(friend => {
             return (
                 <div key={friend.friend_id} className='dropdown-item'>
                   <div onClick={() => this.updateSelectedFriend(friend.username, friend.user_id)} className='selected-friend-container'>
                     <img src={friend.profile_img} alt='profile' style={{width: '20px', height:'20px'}}/>
                     <p>{friend.username}</p>
                   </div>
                </div>
             )
         })


         let mappedMessages = this.state.messages.map(message => {
             return (
                 <div key={message.message_id} className='messages-wrapper'>
                   <div className='user-info-messages'>
                     <img src={message.profile_img} alt='profile' style={{width: '25px', height:'25px'}}/>
                     <p>{message.username}</p>
                   </div>
                    <p>Subject: {message.subject}</p>
                    <p>Message: {message.message}</p>
                    <Message messageId={message.message_id}/>
                 </div>
             )
         })

         const {user, selectedFriendUsername, selectFriendId, subjectInput, messageInput} = this.state
         return (
             <div className='Messages'>
               <Header />
               <h1>User</h1>
               <div className='messages-user-wrapper'>
                 <img src={user.profile_img} alt='profile' style={{width: '100px', borderRadius: '100%'}}/>
                 <p>{user.username}</p>
                 <p>{user.about_me}</p>
               </div>
               <h1 style={{color: '#fff'}}>FriendMessages</h1>
                 {mappedFriends}
               <h1>Messages</h1>
               <button onClick={() => this.showMessageModal()} style={{padding:'10px'}} >Create Message</button>
               {this.state.showMessageModal ? 
                <div className='message-modal-wrapper'>
                    <div className={this.state.toggleFriendDropdown ? "dropdown is-active" : "dropdown"}>
                      <div className="dropdown-trigger">
                        <p>To:</p>
                        <button onClick={() => this.toggleFriendDropdown()} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                         {selectedFriendUsername ?
                         <span>{selectedFriendUsername}</span> :
                         <span>Select A Friend</span>
                         }
                          <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </button>
                      </div>
                      <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                          {mappedSelectedFriends}
                        </div>
                      </div>
                    </div>
                    <p>Subject:</p>
                    <input 
                      onChange={this.handleSubject}
                      value={this.state.subjectInput}
                      type='text'
                      placeholder='Subject Here...'
                    />
                    <textarea 
                      onChange={this.handleMessage}
                      value={this.state.messageInput}
                      type='text'
                      placeholder='Write Message...'
                      className='textarea'
                    ></textarea>
                    <button onClick={() => this.sendMessage(selectFriendId, subjectInput, messageInput)}>Send</button>
                    <button onClick={() => this.showMessageModal()}>Cancel</button>
                 </div> : null
               }
               {this.state.messages[0] ?
                <div>
                    {mappedMessages}
                </div> :
                <div>
                    <p style={{fontSize: '50px'}}>No Messages Found</p>
                </div>
                }
            </div>
         )
     }
 }

 export default Messages