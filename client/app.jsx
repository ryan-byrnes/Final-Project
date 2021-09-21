import React from 'react';
import PrPage from './pages/prs';
import Header from './components/header';
import TrainingLog from './pages/training-log';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Analytics from './pages/analytics';
import Footer from './components/footer';

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
            <Route exact path="/analytics">
              <Analytics />
            </Route>
          </Switch>
      </Router>
    );
  }
}
