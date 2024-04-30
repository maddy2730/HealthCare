import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Slidebar';
export default function Read() {
  const [mainWrapperMargin, setMainWrapperMargin] = useState('250px');
  const toggleMainWrapperMargin = () => {
    setMainWrapperMargin(prevMargin => prevMargin === '250px' ? '0px' : '250px');
  };
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3002/users/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, [id]);

  return (
    <>
     <Sidebar toggleMainWrapperMargin={toggleMainWrapperMargin} />
      <div className="content-wrapper main-wrapper " style={{ marginLeft: mainWrapperMargin }}>
      <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border border-1 border-gray p-4 rounded-3"  style={{width:"425px"}}>
          <h3>User Details</h3>
          <div className="mb-3">
            <strong>Name:</strong> {data.name}
          </div>
          <div className="mb-3">
            <strong>Surname:</strong> {data.surname}
          </div>
          <div className="mb-3">
            <strong>Phone:</strong> {data.phone}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {data.username}
          </div> <div className="mb-3">
            <strong>Website:</strong> {data.website}
          </div>

          <Link to={`/update/${id}`} className="btn btn-warning mr-2"  style={{marginRight: "10px"}}>Edit</Link>
          <Link to="/User" className="btn btn-primary">Back</Link>
        </div>
      </div>
    </div>
      </div>
    </>
  
  );
}
