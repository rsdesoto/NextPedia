import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import { FlightFinder, Landing, User, UserDashboard, FAQ } from './components/pages';
import { MenuBar, Footer } from './components';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <MenuBar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/test' component={Home} />
            <Route exact path='/user' component={User} />
            <Route exact path='/flightFinder' component={FlightFinder} />
            <Route exact path='/FAQ' component={FAQ} />
          </Switch>
          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
