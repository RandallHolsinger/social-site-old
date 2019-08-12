import React, {Component} from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';

class Profiles extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profiles: [],
            user_id: 0
        }
    }

    componentDidMount() {
        this.getProfiles()
    }
    
    getProfiles = () => {
        axios.get(`/api/profiles`).then(res => {
            this.setState({
                profiles: res.data
            })
        })
    }

    updateUserId = (user_id) => {
        this.setState({
            profileId: user_id
        })
    }

    sendFriendRequest = () => {
        axios.post(`/api/friends/request/${this.state.user_id}`).then(()=> {
            alert('friend request sent!')
        })
    }


    render() {
        
        let profilesToDisplay = this.state.profiles.map(profile => {
            return (
                <div key={profile.user_id} onClick={() => this.updateUserId(profile.user_id)}>
                <img src={profile.profile_img} alt='profile' style={{width: '40px'}}/>
                <Link to={`profile/view/${profile.user_id}`}>
                <p>{profile.username}</p>
                </Link>
                <p>{profile.city}</p>
                <p>{profile.state}</p>
                <button onClick={() => this.sendFriendRequest()}>Add Friend</button>
                </div>
            )
        })
        return (
            <div className='Profiles'>
            <Header />
            {profilesToDisplay}
            </div>
        )
    }
}

export default Profiles