import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

import { Link} from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async () => {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmpassword.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmpassword) {
      alert('Passwords do not match');
      return;
    }

    // Validate password criteria: at least one number, minimum 2 capital characters, and minimum length of 8
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z].*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must contain at least one number, minimum 2 capital characters, and minimum length of 8');
      return;
    }

    try {
      // Send POST request to server to sign up user
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/main`, {
        username,
        email,
        password,
        confirmpassword
      });

      console.log('User signed up successfully:', response.data);

      // Clear form fields after successful sign up
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred while signing up');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
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
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={confirmpassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
                <div className="d-grid">
                  <button type="button" className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
                </div>
                <p className="text-center mt-3">Do have an account? <Link to='/'>Log In</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
