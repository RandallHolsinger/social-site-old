import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser, clearUser } from "../../redux/reducer";

import "react-bulma-components/dist/react-bulma-components.min.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  login = async () => {
    const { username, password } = this.state;
    try {
      let res = await axios.post("/auth/login", { username, password });
      this.props.updateUser(res.data);
      this.props.history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  getUser = async () => {
    const { user_id } = this.props;
    if (!user_id) {
      try {
        let res = await axios.get("/auth/current");
        this.props.updateUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  routeRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <div className="Login">
        <div className='login-form'>
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              value={this.state.username}
              onChange={this.handleUsername}
              placeholder="username"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          </div>
        </div>
        <button onClick={this.login}>Login</button>
        <button onClick={() => this.routeRegister()}>Register</button>

        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user_id: reduxState.user_id,
    reduxState
  };
};

const mapDispatchToProps = {
  updateUser,
  clearUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
