import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router'
import history from './components/pages/history';
import LoginContainer from './components/containers/LoginContainer';
import RegisterContainer from './components/containers/RegisterContainer';
import ProfileContainer from './components/containers/ProfileContainer';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';

const { store, persistor } = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<div />} persistor={persistor}>
          <Router history={history}>
              <Switch> 
                <Route exact path="/" component={LoginContainer}/>
                {/* other paths */}
                <Route exact path="/profile" component={ProfileContainer}/>
                <Route exact path="/home" component={ProfileContainer}/>
              </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
