import React from 'react';
import PrPage from './pages/prs';
import Header from './components/header';
import TrainingLog from './pages/training-log';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <Router>
       <Header />
        <Switch>
          <Route exact path="/">
            <TrainingLog />
          </Route>
          <Route exact path="/pr">
            <PrPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}
