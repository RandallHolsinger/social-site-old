import React, {Component} from 'react';
import './Profiles.css'
import axios from 'axios';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';

class Profiles extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profiles: [],
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

    sendFriendRequest = (id) => {
        axios.post(`/api/friends/request`, {id}).then(()=> {
            alert('friend request sent!')
        })
    }


    render() {
        
        let profilesToDisplay = this.state.profiles.map(profile => {
            return (
                <div key={profile.user_id} className='profile-wrapper'>
                <img src={profile.profile_img} alt='profile' style={{width: '80px'}}/>
                <Link to={`profile/view/${profile.user_id}`}>
                <p>{profile.username}</p>
                </Link>
                <p>{profile.city}</p>
                <p>{profile.state}</p>
                <button onClick={() => this.sendFriendRequest(profile.user_id)}>Add Friend</button>
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