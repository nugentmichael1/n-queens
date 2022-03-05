import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './pages/About'
import { BrowserRouter, Route, Routes } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<App />}></Route>
  //     <Route path="/About" element={<About />}></Route>
  //   </Routes>
  // </BrowserRouter>,
  document.getElementById('root')
);
