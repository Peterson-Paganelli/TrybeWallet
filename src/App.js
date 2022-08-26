import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './style/App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
    </BrowserRouter>
  );
}

export default App;
