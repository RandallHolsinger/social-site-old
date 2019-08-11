import React, {Component} from 'react';
import './Header.css';
import {connect} from 'react-redux';
import {clearUser, updateUser} from '../../redux/reducer'
import axios from 'axios';
import {Link} from 'react-router-dom'

class Header extends Component{
    constructor(props){
        super(props)

        this.state = {
            toggleNav: false
        }
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {
        const {user_id} = this.props
        if(!user_id) {
            try {
                let res = await axios.get('/auth/current')
                this.props.updateUser(res.data)
            } catch(err) {
                console.log(err)
            }
        }
    }

    logout = () => {
        axios.post('/auth/logout')
        this.props.clearUser()
   
    }

    render(){
        return(
            <div className='header-wrapper'>
              <header>
                      <Link to='/'>
                      <h1 className="logo">LOGO</h1>
                      </Link>
                  <nav>
                      <ul>
                         
                          <Link to='/profiles'>
                            <li>Profiles</li>
                          </Link>
                          <Link to='/user/profile'>
                            <li>My profile</li>
                          </Link>
                      </ul>
                  </nav>
                  <div className='header-login'>
                  {this.props.reduxState.user_id ? 
               <div>
                  <p>Welcome {this.props.reduxState.username}</p>
                  <Link to={'/'}>
                   <button className='logout-btn' onClick={() => this.logout()}>Logout</button>
                   </Link>
              </div> : null}
                  </div>
              </header>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user_id,
        reduxState
    }
}

const mapDispatchToProps = {
    updateUser,
    clearUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)