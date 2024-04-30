import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Send POST request to server to authenticate user
      const response = await axios.post('https://dummyjson.com/auth/login', {
        email,
        password
      });

      console.log('Login successful:', response.data);

      // Redirect to landing page upon successful login
      // navigate('/landing');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid email or password. Please try again or sign up.');
    }
  };

  const handleSignUp = () => {
    navigate('/signUp');
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5 add-new">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="d-grid">
                  <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
                <p className="text-center mt-3">Don't have an account? <Link to='/signUp'>Sign Up</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
