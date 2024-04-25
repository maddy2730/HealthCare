
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link , useNavigate  } from 'react-router-dom';
import Sidebar from './Slidebar';
export default function Update() {
  const [mainWrapperMargin, setMainWrapperMargin] = useState('250px');
  const toggleMainWrapperMargin = () => {
    setMainWrapperMargin(prevMargin => prevMargin === '250px' ? '0px' : '250px');
  };
  // const [data, setData] = useState([]);
  const {id} = useParams();
  const  [value, setValue ] = useState(
    {
      name: '',
    surname: '',
    phone: '',
    username: '',
    website: ''
    }   
  );
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`)
      .then(res =>{
        const userData = res.data;
        setValue({
          name: userData.name,
          surname: userData.surname,
          phone: userData.phone,
          username: userData.username,
          website: userData.website
        });
      }
       
        
        )
      .catch(err => console.error('Error fetching data:', err));
  }, []);
const handleUpdate = (event)=>{ 
  event.preventDefault();
  axios.put('http://localhost:3001/users/'+id,value)
  .then(res => {console.log(res);
    navigate('/category')
  }).catch(err => console.log(err));

}
  return (
    <>
       <Sidebar toggleMainWrapperMargin={toggleMainWrapperMargin} />
 <div className="content-wrapper main-wrapper " style={{ marginLeft: mainWrapperMargin }}>
    <div className="container mt-5">
         <div className="row justify-content-center">
             <div className="col-md-6">
                 <form onSubmit={handleUpdate}>
                     <div className="mb-3">
                         <label htmlFor="name" className="form-label">Name</label>
                         <input type="text" className="form-control" id="name" placeholder="Enter your name" value={value.name} onChange={e => setValue({...value, name: e.target.value})}/>
                     </div>
                     <div className="mb-3">
                <label htmlFor="surname" className="form-label">Surname</label>
                <input type="text" className="form-control" value={value.surname} id="surname" placeholder="Enter your name" onChange={e => setValue({ ...value, surname: e.target.value })} />
              </div>
                     <div className="mb-3">
                         <label htmlFor="phone" className="form-label">Phone Number</label>
                         <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" value={value.phone}  onChange={e => setValue({...value, phone: e.target.value})}/>
                     </div>
                     <div className="mb-3">
                         <label htmlFor="email" className="form-label">Email</label>
                         <input type="email" className="form-control" id="email" placeholder="Enter your email" value={value.username} onChange={e => setValue({...value, username: e.target.value})}/>
                     </div>
                     <div className="mb-3">
                <label htmlFor="Website" className="form-label">Website</label>
                <input type="tel" className="form-control" id="website" placeholder="Enter your website"  value={value.website} onChange={e => setValue({ ...value, website: e.target.value })} />
              </div>
                     <button type="submit" className="btn btn-primary me-2">Update</button>
                     <Link to='/category' className="btn btn-primary me-2">Submit</Link>
                     <Link to='/category'>Back</Link>                    </form>
             </div>
         </div>
     </div>
 </div>
    </>
   
  )
}
