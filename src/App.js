import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './auth/PrivateRoute';
import AddProducts from './pages/AddProducts';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/add-products" exact component={AddProducts} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
