import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

import LandingPage from './LandingPage';
import Newcategory from './Newcategory';

import Home from './Home';
import  Create  from './Create';
import Update  from './Update';
import Read from './Read';
import ShowData from './ShowData';
import ProductIteam from './ProductIteam';

const App = () => {
  return (
    <Router>
    <Routes>
          {/* <Route path = "/" element = <Login /> /> */}
          <Route path = "/login" element = {<Login />}> </Route>
          <Route path = "/" element = {<LandingPage />}></Route>
          <Route path='/create' element = {<Create/>}> </Route>
          <Route path='/update/:id' element= {<Update />}> </Route>
          <Route path='/read/:id' element= {<Read /> }> </Route>
          {/* <Route path = "/landing" element = {<LandingPage />}></Route> */}
          <Route path="/User" element = {<Home /> } > </Route>
          <Route path="/category" element = {<Newcategory /> } > </Route>
          <Route path="/signUp" element = {<SignUp/>} > </Route>
          <Route path="/showdata" element = {<ShowData />} > </Route>
          <Route path="/productiteam" element ={<ProductIteam />}> </Route>
          </Routes>
    </Router>
  );
};

export default App;
         