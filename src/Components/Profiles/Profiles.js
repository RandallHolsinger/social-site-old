import React, {Component} from 'react';
import axios from 'axios';
import Header from '../Header/Header';

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


    render() {
        
        let profilesToDisplay = this.state.profiles.map(profile => {
            return (
                <div key={profile.user_id}>
                <img src={profile.profile_img} alt='profile' style={{width: '40px'}}/>
                <p>{profile.username}</p>
                <p>{profile.city}</p>
                <p>{profile.state}</p>
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