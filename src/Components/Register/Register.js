import React, {Component} from 'react';
import './Register.css';
import axios from 'axios';
import ParticlesJS from '../particlesJS';
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
            defaultImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            validUsername: false,
            validPassword: false,
            validConPassword: false,
            validEmail: false
        }
    }
    componentDidMount() {
        this.getUser()
    }

    register = async () => {
        const {validUsername, validPassword, validConPassword, validEmail} = this.state
        if(validUsername && validPassword && validConPassword && validEmail) {
        try {
            const {username, password, email, defaultImage} = this.state
            let res = await axios.post('/auth/register', {username, password, email, defaultImage})
            console.log(this.state)
            this.props.updateUser(res.data)
            this.props.history.push('/home')
        } catch(err) {
            console.log(err)
        }
       } else {
           alert('form is invalid!')
       }
     }

     login = async () => {
        const {username, password} = this.state
        try {
            let res = await axios.post('/auth/login', {username, password})
            this.props.updateUser(res.data)
            this.props.history.push('/home')
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

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
        this.checkUsername(e.target.value)
    }

     handlePassword = (e) => {
         this.setState({
             password: e.target.value
         })
         this.checkPassword(e.target.value)
     }
     handleConPassword = (e) => {
         this.setState({
             confirmPassword: e.target.value
         })
         this.checkConPassword(e.target.value)
     }
     handleEmail = (e) => {
         this.setState({
             email: e.target.value
         })
         this.checkEmail(e.target.value)
     }

     checkUsername = (value) => {
         
         if(value.length >= 3) {
             this.setState({
                 validUsername: true
             })
         } else {
             this.setState({
                 validUsername: false
             })
         }
     }

     checkPassword = (value) => {
          if(value.length >= 7) {
              this.setState({
                  validPassword: true
              })
          } else {
              this.setState({
                  validPassword: false
              })
          }
     }

     checkConPassword = (value) => {
         const {password} = this.state
         if(password === value) {
             this.setState({
                 validConPassword: true
             })
         } else {
             this.setState({
                 validConPassword: false
             })
         }

     }

     checkEmail = (value) => {
        let testedEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
        if(testedEmail) {
            this.setState({
                validEmail: true
            })
        } else {
            this.setState({
                validEmail: false
            })
        }
     }
     
     
    render() {
        return (
          <div className='Register'>
             <p style={{color: 'white'}}>Register</p>
             <div className='reg-form'>
             <div className="field">
          <label className="label">Username</label>
          <p className="help">username must be at least 3 characters</p>
          <div className="control has-icons-left has-icons-right">
            <input
              className={this.state.validUsername ? "input is-success" : "input is-danger"}
              type="text"
              value={this.state.username}
              onChange={this.handleUsername}
              placeholder="username"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i className={this.state.validUsername ? "fas fa-check is-success" : "fas fa-exclamation-triangle is-danger"} />
            </span>
          </div>
          {this.state.validUsername ?
          <p className="help is-success">This username is valid</p> :
          <p className="help is-danger">This username is invalid</p> }
          
        </div>

        <div className="field">
          <label className="label">Password</label>
          <p className="help">password must be at least 7 characters</p>
          <div className="control has-icons-left has-icons-right">
            <input
              className={this.state.validPassword ? "input is-success" : "input is-danger"}
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
            </span>
            <span className="icon is-small is-right">
              <i className={this.state.validPassword ? "fas fa-check is-success" : "fas fa-exclamation-triangle is-danger"}></i>
            </span>
          </div>
          {this.state.validPassword ?
          <p className="help is-success">This password is valid</p> :
          <p className="help is-danger">This password is invalid</p>}
        </div>
             <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control has-icons-left has-icons-right">
          <input
                 className={this.state.validConPassword ? "input is-success" : "input is-danger"}
                 value={this.state.confirmPassword}
                 onChange={this.handleConPassword}
                 placeholder='confirm password'
                 type='password'
               />
            <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
            </span>
            <span className="icon is-small is-right">
              <i className={this.state.validPassword ? "fas fa-check is-success" : "fas fa-exclamation-triangle is-danger"}/>
            </span>
          </div>
          {this.state.validConPassword ?
          <p className="help is-success">This password is a match</p> :
          <p className="help is-danger">This password doesn't match</p>}
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
          <input
             className={this.state.validEmail ? "input is-success" : "input is-danger"}
             value={this.state.email}
             onChange={this.handleEmail}
             placeholder='email'
          />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className={this.state.validEmail ? "fas fa-check is-success" : "fas fa-exclamation-triangle is-danger"}></i>
            </span>
          </div>
          {this.state.validEmail ?
          <p className="help is-success">This email is valid</p> :
          <p className="help is-danger">This email is invalid</p>}
        </div>
               
               
               
               
              <button className='submit-reg' onClick={() => this.register()}>Submit</button>
             </div>
             <ParticlesJS />
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)