import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Login from './Login';
import LandingPage from './LandingPage';
import Category from './Category';
import Home from './Home';
import  Create  from './Create';
import Update  from './Update';
import Read from './Read';

const App = () => {
  return (
    <Router>
    <Routes>
          {/* <Route path = "/" element = <Login /> /> */}
          <Route path = "/" element = {<Login />}> </Route>
          <Route path='/create' element = {<Create/>}> </Route>
          <Route path='/update/:id' element= {<Update />}> </Route>
          <Route path='/read/:id' element= {<Read /> }> </Route>
          <Route path = "/landing" element = {<LandingPage />}></Route>
          <Route path="/category" element = {<Home /> } > </Route>
          </Routes>
    </Router>
  );
};

export default App;
