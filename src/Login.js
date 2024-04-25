import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (phoneNumber.trim() === '' || password.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    navigate('/landing');
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
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="form-control"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
