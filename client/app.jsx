import React from 'react';
import PrPage from './pages/prs';
import Header from './components/header';
import TrainingLog from './pages/training-log';

export default class App extends React.Component {
  render() {
    return (
      <>
       <Header />
       <TrainingLog />
       {/* <PrPage /> */}
      </>
    );
  }
}
