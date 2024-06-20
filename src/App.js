import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Signup from './components/sign up/Signup';
import Login from './components/sign up/Login';
import Welcome from './components/sign up/Welcome';
import ProfileCompletion from './components/sign up/ProfileCompletion';
import ForgotPassword from './components/sign up/ForgotPassword';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/complete-profile" component={ProfileCompletion} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/" component={Signup} />
        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
