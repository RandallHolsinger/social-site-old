import React, {Component} from 'react';
import axios from 'axios';
import ParticlesJS from '../particlesJS'
import {connect} from 'react-redux';
import {updateUser, clearUser} from '../../redux/reducer';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            username: '',
            password: '',
            confirmPassword:'',
            email: '',
            dob: '',
            city: '',
            state: ''
        }
    }

    register = async () => {
        try {
            const {username, password, email, dob, city, state} = this.state
            let res = await axios.post('/auth/register', {username, password, email, dob, city, state})
            console.log(this.state)
            this.props.updateUser(res.data)
        } catch(err) {
            console.log(err)
        }
     }
     handleUsername = (e) => {
         this.setState({
             username: e.target.value
         })
     }
     handlePassword = (e) => {
         this.setState({
             password: e.target.value
         })
     }
     handleConPassword = (e) => {
         this.setState({
             confirmPassword: e.target.value
         })
     }
     handleEmail = (e) => {
         this.setState({
             email: e.target.value
         })
     }
     handleDob = (e) => {
         this.setState({
             dob: e.target.value
         })
     }
     handleCity = (e) => {
         this.setState({
             city: e.target.value
         })
     }
     handleState = (e) => {
         this.setState({
             state: e.target.value
         })
     }
     
    render() {
        return (
          <div className='Register'>
             <p>Register</p>
             <div className='reg-form'>
               <input 
                  className='username-reg'
                  value={this.state.username}
                  onChange={this.handleUsername}
                  placeholder='username'
               />
               <input
                  className='password-reg'
                  value={this.state.password}
                  onChange={this.handlePassword}
                  placeholder='password'
                  type='password'
               />
               <input
                 className='confirm-password'
                 value={this.state.confirmPassword}
                 onChange={this.handleConPassword}
                 placeholder='confirm password'
                 type='password'
               />
               <input
                  className='email-reg'
                  value={this.state.email}
                  onChange={this.handleEmail}
                  placeholder='email'
               />
               <input
                 className='dob-reg'
                 value={this.state.dob}
                 onChange={this.handleDob}
                 placeholder='mm/dd/yyyy'
               />
               <input
                 className='city-reg'
                 value={this.state.city}
                 onChange={this.handleCity}
                 placeholder='city'
               />
               <input
                 className='state-reg'
                 value={this.state.state}
                 onChange={this.handleState}
                 placeholder='state'
               />
              <button className='submit-reg' onClick={() => this.register()}>Submit</button>
             </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)