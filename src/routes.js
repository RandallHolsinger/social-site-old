import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import PersonalProfile from './Components/PersonalProfile/PersonalProfile';

export default (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register}/>
      <Route path='/profile/personal:id' component={PersonalProfile}/>
    </Switch>
)