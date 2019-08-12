import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import PersonalProfile from './Components/PersonalProfile/PersonalProfile';
import Home from './Components/Home/Home';
import Post from './Components/Post/Post';
import Profiles from './Components/Profiles/Profiles';
import ProfileView from './Components/ProfileView/ProfileView';

export default (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register}/>
      <Route path='/profile/view/:user_id'  component={ProfileView}/>
      <Route path='/home' component={Home}/>
      <Route path='/profiles' component={Profiles}/>
      <Route path='/user/profile' component={PersonalProfile}/>
      <Route path='/post/:post_id' component={Post}/>
    </Switch>
)