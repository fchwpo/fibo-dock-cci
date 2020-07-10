import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';


function App() {
  return (
    
    <div className="App">
    <BrowserRouter>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Link to='/otherpage' children='Other' />
      <Link to='/' children='Home' />
      <div>
        <Route exact path='/' component={Fib} />
        <Route exact path='/otherpage' component={OtherPage} />
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
