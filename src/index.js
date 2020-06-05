import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Route} from "react-router-dom";

import Screen1 from './components/screen1';
import Screen2 from './components/screen2';
import Screen3 from './components/screen3';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/" exact component={Screen1} />
      <Route path="/screen2" exact component={Screen2} /> 
      <Route path="/screen3" exact component={Screen3} />   
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
