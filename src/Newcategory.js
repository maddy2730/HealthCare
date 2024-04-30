import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Slidebar';
import { useNavigate } from 'react-router-dom';

const Newcategory = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newSubCategoryImage, setNewSubCategoryImage] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImage, setNewProductImage] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [mainWrapperMargin, setMainWrapperMargin] = useState('250px');
  const navigate = useNavigate();

  const toggleMainWrapperMargin = () => {
    setMainWrapperMargin(prevMargin => prevMargin === '250px' ? '0px' : '250px');
  };

  useEffect(() => {
    axios.get('http://localhost:8000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
    setSubCategories([]);
    axios.get(`http://localhost:8000/categories/${e.target.value}/subcategories`)
      .then(response => {
        setSubCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching subcategories:', error);
      });
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategoryId(e.target.value);
  };

  const handleAddCategory = () => {
    axios.post('http://localhost:8000/categories', { name: newCategoryName })
      .then(response => {
        setCategories([...categories, response.data]);
        setNewCategoryName('');
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
  };

  const handleAddSubCategory = () => {
    const formData = new FormData();
    formData.append('name', newSubCategoryName);
    formData.append('image', newSubCategoryImage);

    axios.post(`http://localhost:8000/categories/${selectedCategoryId}/subcategories`, formData)
      .then(response => {
        setSubCategories([...subCategories, response.data]);
        setNewSubCategoryName('');
        setNewSubCategoryImage(null);
      })
      .catch(error => {
        console.error('Error adding subcategory:', error);
      });
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('name', newProductName);
    formData.append('description', newProductDescription);
    formData.append('price', newProductPrice);
    formData.append('image', newProductImage);

    axios.post(`http://localhost:8000/subcategories/${selectedSubCategoryId}/products`, formData)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProductName('');
        setNewProductDescription('');
        setNewProductPrice('');
        setNewProductImage(null);
        navigate('/productiteam', { product: response.data });
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  const handleSubCategoryImageChange = (e) => {
    setNewSubCategoryImage(e.target.files[0]);
  };

  const handleProductImageChange = (e) => {
    setNewProductImage(e.target.files[0]);
  };

  return (
    <>
      <Sidebar toggleMainWrapperMargin={toggleMainWrapperMargin} />
      <div className="content-wrapper main-wrapper" style={{ marginLeft: mainWrapperMargin }}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 add-category">
                <div className="card-body">
                  <h3 className="card-title">Add Category</h3>
                  <input type="text" className="form-control mb-2" placeholder="Enter category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                  <button className="btn btn-outline-danger btn-lg" onClick={handleAddCategory}>Add Category</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="card-title">Add Subcategory</h3>
                  <select className="form-select mb-2" value={selectedCategoryId} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <input type="text" className="form-control mb-2" placeholder="Enter subcategory name" value={newSubCategoryName} onChange={(e) => setNewSubCategoryName(e.target.value)} />
                  <input type="file" className="form-control mb-2" onChange={handleSubCategoryImageChange} />
                  <button className="btn btn-outline-primary btn-lg" onClick={handleAddSubCategory}>Add Subcategory</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="card-title">Add Product</h3>
                  <select className="form-select mb-2" value={selectedSubCategoryId} onChange={handleSubCategoryChange}>
                    <option value="">Select Subcategory</option>
                    {subCategories.map(subCategory => (
                      <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                    ))}
                  </select>
                  <input type="text" className="form-control mb-2" placeholder="Enter product name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
                  <input type="text" className="form-control mb-2" placeholder="Enter product description" value={newProductDescription} onChange={(e) => setNewProductDescription(e.target.value)} />
                  <input type="number" className="form-control mb-2" placeholder="Enter product price" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />
                  <input type="file" className="form-control mb-2" onChange={handleProductImageChange} />
                  <button className="btn btn-outline-warning btn-lg" onClick={handleAddProduct}>Add Product</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newcategory;
