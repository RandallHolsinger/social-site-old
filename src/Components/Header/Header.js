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
            showMessages: false,
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

    showMessages() {
        this.setState({
            showMessages: !this.state.showMessages
        })
    }

    handlePath = (path) => {
        this.props.history.push(path)
    }

    render(){
        return(
            <div className='header-wrapper'>
              <nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <Link to='/home' className="navbar-item" href="https://bulma.io">
    
      <img src="https://bulma.io/images/bulma-logo.png" alt='logo' width="112" height="28"/>
    </Link>
    

    <a href='#/'role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
    <Link to='/user/profile' className="navbar-item">
        My Profile
    </Link>

      <Link to='/profiles'className="navbar-item">
        Profiles
      </Link>

     
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <div></div>
          {this.props.reduxState.user_id ? 
               <div className='logout'>
                  <p>Welcome, {this.props.reduxState.username}!</p>
          <Link to='/'>
          <button className='logout-btn' onClick={() => this.logout()}>Logout</button>
          </Link>
                  
              </div> : null}
        </div>
      </div>
    </div>
  </div>
</nav>
                 
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