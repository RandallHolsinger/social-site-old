import React, {Component} from 'react'
import axios from 'axios';

class ProfileView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.getProfile()
    }



    getProfile = () => {
        axios.get(`/profile/view/${this.props.match.params.user_id}`).then(res => {
            this.setState({
                user: res.data[0]
            })
        })
    }
    
    render() {
        const {user} = this.state
        return (
            <div>
                <p>hello there</p>
                <p>{user.user_id}</p>
                <img src={user.profile_img} alt='profile' style={{width:'100px'}} />
                <p>{user.username}</p>
            </div>
        )
    }
    
}

export default ProfileView