import React from 'react';
import PrPage from './pages/prs';
import Header from './components/header';
import Example from './components/date-picker';

export default class App extends React.Component {
  render() {
    return (
      <>
      <Example />
       <Header />
       <PrPage />
      </>
    );
  }
}
