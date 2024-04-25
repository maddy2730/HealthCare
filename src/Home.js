import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Slidebar';

export default function Home() {
  const [mainWrapperMargin, setMainWrapperMargin] = useState('250px');
  const toggleMainWrapperMargin = () => {
    setMainWrapperMargin(prevMargin => prevMargin === '250px' ? '0px' : '250px');
  };
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete your data?");
    if (confirm) {
      axios.delete(`http://localhost:3001/users/${id}`)
        .then(res => {
          window.location.reload();
        }).catch(err => console.log(err))
    }
  }

  return (
    <>
       <Sidebar toggleMainWrapperMargin={toggleMainWrapperMargin} />
       <div className="content-wrapper main-wrapper " style={{ marginLeft: mainWrapperMargin }}>
  <div className='container'>
  <h3 className="mb-4 mt-4">User Data</h3>
  <div className='mr-4 justify-content-end d-flex'>
  <Link to="/create" className="btn btn-primary mb-3">Add+</Link>
  </div>

   <table className="table">
     <thead className="thead-light">
       <tr>
         <th>ID</th>
         <th>Name</th>
         <th>Surname</th>
         <th>Phone</th>
         <th>Username</th>
         <th>Website</th>
         <th colSpan="3">Actions</th>
       </tr>
     </thead>
     <tbody>
       {data.map(user => (
         <tr key={user.id}>
           <td>{user.id}</td>
           <td>{user.name}</td>
           <td>{user.surname}</td>
           <td>{user.phone}</td>
           <td>{user.username}</td>
           <td>{user.website}</td>
           <td>
             <Link to={`/read/${user.id}`} className="btn btn-info btn-sm mr-1">View</Link>
           </td>
           <td>
             <Link to={`/update/${user.id}`} className="btn btn-warning btn-sm mr-1">Edit</Link>
           </td>
           <td>
             <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
  </div>
   
 </div>
    </>
   
  );
}
