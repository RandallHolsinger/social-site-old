import React, {Component} from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import './Message.css';

class Message extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            friend: {},
            friendMessages: [],
            messageInput: ''
        }

        this.handleMessageInput = this.handleMessageInput.bind(this)
    }

    componentDidMount() {
         this.getUser()
         this.getFriend()
         console.log(this.state.friend)
    }

    getFriend = () => {
        axios.get(`/api/friend/${this.props.match.params.user_id}`).then(res => {
            this.setState({
                friend: res.data[0]
            })
            console.log(this.props)
        })
    }

    getUser = () => {
        axios.get('/api/user/profile').then(res => {
            this.setState({
                user: res.data[0]
            })
        })
    }

    sendMessage = (id) => {
        const {messageInput} = this.state
        axios.post(`/api/sendMessage`, {messageInput, id}).then(() => {
            alert('Message has been sent sucessfuly!')
        })
    }
    
    handleMessageInput(e) {
        this.setState({
            messageInput: e.target.value
        })
    }



    render() {
        const {user, friend} = this.state
        return (
            <div className='Message'>
            <Header />
            <h1 style={{color:'white'}}>Personal User</h1>
             <div className='personal-user-wrapper'>
               <img src={user.profile_img} alt='profile' style={{width: '100px', borderRadius: '100%'}}/>
               <p>{user.username}</p>
               <p>About Me:</p>
               <p>{user.about_me}</p>
             </div>
             <div className='friend-user-wrapper'>
               <h1 style={{color: 'white'}}>Friend:</h1>
               <img src={friend.profile_img} alt='profile' style={{width: '100px', borderRadius: '100%'}}/>
               <p style={{color: 'white'}}>{friend.username}</p>
             </div>
              <input 
                onChange={this.handleMessageInput}
                className='message-input'
              />
         
            <button onClick={() => this.sendMessage(friend.friend_id)}>Send</button>
              
            </div>
        )
    }
}

export default Message