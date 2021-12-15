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
import UpdateProduct from './pages/UpdateProduct';
import AllProducts from './pages/AllProducts';
import Agents from './pages/Agents';
import SellerPage from './pages/SellerPage';
import ReportPage from './pages/ReportPage';
import ManageOrders from './pages/ManageOrders';
import VerificationPage from './pages/VerificationPage';


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
      <PrivateRoute path="/seller/verification/:requestId" exact component={VerificationPage} />
      <PrivateRoute path="/all-products" exact component={AllProducts} />
      <PrivateRoute path="/agents" exact component={Agents} />
      <PrivateRoute path="/sellers" exact component={SellerPage} />
      <PrivateRoute path="/reports" exact component={ReportPage} />
      <PrivateRoute path="/orders" exact component={ManageOrders} />
      <PrivateRoute path="/add-products" exact component={AddProducts} />
      <PrivateRoute path="/update-product/:productId" exact component={UpdateProduct} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
