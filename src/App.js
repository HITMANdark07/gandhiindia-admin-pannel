import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './auth/PrivateRoute';
import AddProducts from './pages/AddProducts';
import ManageCategories from './pages/ManageCategories';
import ManageSubCategories from "./pages/ManageSubCategories";
import ManageSpecification from './pages/ManageSpecification';
import UpdateCategory from './pages/UpdateCategory';
import UpdateSubCategory from './pages/UpdateSubCategory';
import UpdateSpecifications from './pages/UpdateSpecifications';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/manage-categories" exact component={ManageCategories} />
      <PrivateRoute path="/update-categories/:categoryId" exact component={UpdateCategory} />
      <PrivateRoute path="/manage-sub-categories" exact component={ManageSubCategories} />
      <PrivateRoute path="/update-sub-category/:subcategoryId" exact component={UpdateSubCategory} />
      <PrivateRoute path="/manage-specification" exact component={ManageSpecification} />
      <PrivateRoute path="/update-specification/:specificationId" exact component={UpdateSpecifications} />
      <PrivateRoute path="/add-products" exact component={AddProducts} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
