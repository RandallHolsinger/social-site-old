import React, {Component} from 'react'
import axios from 'axios'

class Message extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            friend: {},
            friendMessages: [],
            messageInput: ''
        }
    }

    componentDidMount() {

    }

    getFriend = () => {
        axios.get(`/api/friend/${this.props.match.params.friend_id}`).then(res => {
            this.setState({
                friend: res.data[0]
            })
        })
    }

    getUser = () => {
        axios.get('/api/user/profile').then(res => {
            this.setState({
                user: res.data[0]
            })
        })
    }




    render() {
        return (
            <div className='Message'>
            
              
            </div>
        )
    }
}

export default Message