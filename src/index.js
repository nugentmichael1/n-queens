import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<App />}></Route>
  //     <Route path="/About" element={<About />}></Route>
  //   </Routes>
  // </BrowserRouter>,
  document.getElementById('root')
);
