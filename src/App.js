
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/sign up/Signup';
import Login from './components/sign up/Login';
import Welcome from './components/sign up/Welcome';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/welcome" component={Welcome} /> 
            <Route path="/" component={Signup} /> 
        </Switch>
    </Router>
);
};


export default App;
