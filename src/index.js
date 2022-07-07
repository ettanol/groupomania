import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
// import Admin from './admin/App';
import User from './user/components/User'
import Posts from './user/components/Posts';
import reportWebVitals from './reportWebVitals';

const index = ReactDOM.createRoot(document.getElementById('index'));
index.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route path='/admin' element={ <Admin /> } /> */}
        <Route path='/' element={ <User /> } />
        <Route path='/posts' element={ <Posts /> } />
      </Routes>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
