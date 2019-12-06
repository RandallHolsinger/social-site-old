import React, {Component} from 'react';
import './Home.css'
import axios from 'axios';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import "react-bulma-components/dist/react-bulma-components.min.css";
import Posts from '../Posts/Posts'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            postInput: '',
            commentInput: '',
            showComments: false,
            postId: 0
        }
    }

    componentDidMount() {
        this.getUser()
    }
    
    getUser = () => {
        axios.get(`/api/user/profile`).then(res => {
            this.setState({
                user: res.data[0]
            })
        })
    }
    
    render() {
        const {user} = this.state
        return(
            <div className='Home'>
             <Header />
                <div className='home-user-wrapper'>
                  <img src={user.profile_img} alt='profile' style={{width: '100px', borderRadius: '100%'}}/>
                  <p>{user.username}</p>
                  <p>About Me:</p>
                  <p>{user.about_me}</p>
                </div>
                <Posts />
            </div>
        )
    }

    
    
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user_id
    }
}



export default connect(mapStateToProps)(Home)