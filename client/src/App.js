import React from 'react';
import { Route } from 'react-router-dom';

import Welcome from './components/Welcome';
import Posts from './components/Posts'

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path = '/' component = {Welcome} />
      <Route exact path = '/posts' component = {Posts} />
    </div>
  );
}

export default App;
