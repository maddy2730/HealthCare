import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Slidebar';

export default function Create() {
  const [mainWrapperMargin, setMainWrapperMargin] = useState('250px');
  const toggleMainWrapperMargin = () => {
    setMainWrapperMargin(prevMargin => prevMargin === '250px' ? '0px' : '250px');
  };
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: '',
    surname: '',
    phone: '',
    username: '',
    website: ''
   
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3002/users', value)
      .then(res => {
        console.log(res);
        navigate('/User');
      })
      .catch(err => console.log(err));
  }

  return (
    <>
       <Sidebar toggleMainWrapperMargin={toggleMainWrapperMargin} />
       <div className="content-wrapper main-wrapper " style={{ marginLeft: mainWrapperMargin }}>
       <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border rounded p-4">
            <h2 className="mb-4 text-center">Create User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" onChange={e => setValue({ ...value, name: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="surname" className="form-label">Surname</label>
                <input type="text" className="form-control" id="surname" placeholder="Enter your name" onChange={e => setValue({ ...value, surname: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" onChange={e => setValue({ ...value, phone: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={e => setValue({ ...value, username: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="Website" className="form-label">Website</label>
                <input type="tel" className="form-control" id="website" placeholder="Enter your website" onChange={e => setValue({ ...value, website: e.target.value })} />
              </div>
              <div className="d-flex justify-content-between">
               <button type='submit'  className="btn btn-primary">Submit</button>
                <Link to='/User' className="btn btn-secondary"><button type='submit'  className="btn btn-primary">Back</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
       </div>
    </>
 
  )
}
