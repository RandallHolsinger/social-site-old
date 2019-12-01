import React, {Component} from 'react';
import "./Message.css";
import axios from 'axios';

class Message extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messageReplies: [],
            replyInput: '',
            showReplies: false
        }
    }

    componentDidMount() {
      this.getMessageReplies()
    }

    handleReply = (e) => {
        this.setState({
            replyInput: e.target.value
        })
    }

    getMessageReplies = () => {
        axios.get(`/api/message/${this.props.messageId}`).then(res => {
            this.setState({
                messageReplies: res.data
            })
        })
    }

    toggleShowReplies = () => {
        this.setState({
            showReplies: !this.state.showReplies
        })
    }

    sendReply = () => {
       const {replyInput} = this.state
       let {messageId} = this.props
       axios.post(`/api/message/reply`, {replyInput, messageId}).then(() => {
           this.getMessageReplies()
           alert('reply added')
       })
    }


    render() {

        let mappedMessageReplies = this.state.messageReplies.map(reply => {
            return (
                <div key={reply.messages_id} className='reply-wrapper'>
                   <img src={reply.profile_img} alt='profile' style={{width:'20px', height:'20px'}}/>
                   <p>{reply.username}</p>
                   <p>{reply.reply}</p>
                </div>
            )
        }) 
        return(
            <div className='Message'>
            <i onClick={() => this.toggleShowReplies()} className="fas fa-reply"></i>
            {this.state.showReplies ?
              <div>
                  <input 
                    onChange={this.handleReply}
                    value={this.state.replyInput}
                    type='text'
                    placeholder='Write a reply'
                  />
                  <button onClick={() => this.sendReply()}>Reply</button>
                  {mappedMessageReplies}
              </div> : null
            }
            </div>
        )
    }
}

export default Message