import React from 'react';
import { Route } from 'react-router-dom';

import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import UpdatePost from './components/UpdatePost'

import './App.css';

function App() {
  return (
    <div className="App">
      <PostForm />
      <PostCard />
      <Route exact path = '/posts/:id' component = {UpdatePost} />
    </div>
  );
}

export default App;
