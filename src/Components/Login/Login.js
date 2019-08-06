import React, {Component} from 'react';
import './Login.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser, clearUser} from '../../redux/reducer';
import ParticlesJS from '../particlesJS'

class Login extends Component{
   constructor(props){
       super(props)

       this.state = {
           username: '',
           password: '',
       }

       this.handleUsername = this.handleUsername.bind(this)
       this.handlePassword = this.handlePassword.bind(this)
   }

   componentDidMount() {
      this.getUser()
   }


   login = async () => {
     const {username, password} = this.state
     try {
         let res = await axios.post('/auth/login', {username, password})
         this.props.updateUser(res.data)
     } catch(err) {
         console.log(err)
     }
   }

   getUser = async () => {
       const {id} = this.props
       if(!id) {
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

   handleUsername(e) {
       this.setState({
           username: e.target.value
       })
   }

   handlePassword(e) {
     this.setState({
         password: e.target.value
     })
   }

   routeRegister = () => {
       let path = '/register'
       this.props.history.push(path)
   }

   render() {
       return (
           <div className='Login'>
             <h1>Login</h1>
             
             {this.props.reduxState.id ? 
               <div>
                  <p>Welcome {this.props.reduxState.username}</p>
                  <button className='logout-btn' onClick={() => this.logout()}>Logout</button>
              </div>
              :
             <div>
             <input 
               className='username-input'
               value={this.state.username}
               onChange={this.handleUsername}
               placeholder='username'
            />
             <input 
               className='password-input'
               value={this.state.password}
               onChange={this.handlePassword}
               placeholder='password'
               type='password'
            />
            <button onClick={this.login}>Login</button>
            <button onClick={()=> this.routeRegister()}>Register</button>
            </div>
            }
            <ParticlesJS />
           </div>
       )
   }
}

const mapStateToProps = (reduxState) => {
    return {
        id: reduxState.id,
        reduxState
    }
}

const mapDispatchToProps = {
    updateUser,
    clearUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)