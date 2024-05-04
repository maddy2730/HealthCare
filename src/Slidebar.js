import React, { useState } from 'react';
import './App.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
const Sidebar = ({ toggleMainWrapperMargin }) => {
  const [isOpen, setIsOpen] = useState(true);
const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    toggleMainWrapperMargin();
    toggleMainWrapperMargin1();
  };
  const [mainWrapperMargin1, setMainWrapperMargin1] = useState('238px');
  const toggleMainWrapperMargin1 = () => {
    setMainWrapperMargin1(prevMargin => prevMargin === '238px' ? '76px' : '238px');
  };
  const handleLogout = () => {
  

    localStorage.removeItem('authToken'); 

  
    navigate('/');
  };
  const handleLogin = () => {
    navigate('/');
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <div>
              <div>
                <button className="sidebar-toggle navbar-toggler links" onClick={toggleSidebar} type="button" style={{ marginLeft: mainWrapperMargin1 }}>
                  <span className="navbar-toggler-icon "></span>
                </button>
              </div>
              <div className="links " style={{ marginLeft: mainWrapperMargin1 }}>
              <Link to='/landing' className="navbar-brand">Home</Link>
                <a className="navbar-brand">Contact</a>
              </div>
            </div>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
              <button className="btn btn-danger mx-3" onClick={handleLogin}>Login</button>
              <button className="btn btn-danger mx-3" onClick={handleLogout}>Logout</button>

            </form>
          </div>
        </nav>

        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
          <form className="d-flex  search-bar">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul className="navbar-nav">
          <li className="nav-item">
              <i className="fa-solid fa-house"></i>
              <NavLink className="nav-link" to="/category">Category</NavLink>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-house"></i>
              <NavLink className="nav-link" to="/User">User</NavLink>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-location-dot"></i>
              <a className="nav-link" href="#">From</a>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-comment"></i>
              <a className="nav-link" href="#">Charts</a>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-table"></i>
              <a className="nav-link" href="#">Tables</a>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-calendar-days"></i>
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Calendar</a>
            </li>
            <li className="nav-item">
              <i className="fa-brands fa-squarespace"></i>
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Gallery</a>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-envelope"></i>
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Mailbox</a>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-file"></i> 
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Pages</a>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-pager"></i>
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Extras</a>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-magnifying-glass"></i> 
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Search</a>
            </li>
          </ul>
          <h6>MULTILEVEL</h6>
          <ul className="navbar-nav">
            <li className="nav-item">
              <label className="nav-link">
                <input
                  type="checkbox"
                  name="level1"
                  className="custom-checkbox"
                />
                Level 1
              </label>
            </li>
            <li className="nav-item">
              <label className="nav-link">
                <input
                  type="checkbox"
                  name="level2"
                  className="custom-checkbox"
                />
                Level 2
              </label>
            </li>
            <li className="nav-item">
              <label className="nav-link">
                <input
                  type="checkbox"
                  name="level3"
                  className="custom-checkbox"
                />
                Level 3
              </label>
            </li>
          </ul>
          <h6>LABELS</h6>
          <ul className="navbar-nav">
            <li className="nav-item">
              <i className="fa-solid fa-star"></i>
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Important</a>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Warning</a>
            </li>
            <li className="nav-item">
              <i className="fa-solid fa-circle-info"></i>
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Information</a>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
