import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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
