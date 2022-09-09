import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import User from './user/components/User'
import Posts from './user/components/Posts';

const index = ReactDOM.createRoot(document.getElementById('index'));
index.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={ <User /> } />
        <Route path='/posts' element={ <Posts /> } />
      </Routes>
    </Router>
  </React.StrictMode>
)

