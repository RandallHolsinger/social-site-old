import React, {Component} from 'react';
import './Header.css';

class Header extends Component{
    constructor(props){
        super(props)

        this.state = {
            toggleNav: false
        }
    }

    render(){
        return(
            <div className='header-wrapper'>
              <header>
                      <h1 className="logo">LOGO</h1>
                  <nav>
                      <ul>
                          <li>Home</li>
                          <li>Profiles</li>
                          <li>Login</li>
                      </ul>
                  </nav>
              </header>
            </div>
        )
    }
}

export default Header