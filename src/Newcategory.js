import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Slidebar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

 const Newcategory = ()=> {
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
  const navigate = useNavigate(); // Initialize navigate

  const toggleMainWrapperMargin = () => {
    setMainWrapperMargin(prevMargin => prevMargin === '250px' ? '0px' : '250px');
  };
  useEffect(() => {
    // Fetch categories from API
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
    setSubCategories([]); // Clear subcategories when changing category
    // Fetch subcategories for the selected category
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
    // Send POST request to add new category
    axios.post('http://localhost:8000/categories', { name: newCategoryName })
      .then(response => {
        // Update categories state with the new category
        setCategories([...categories, response.data]);
        // Clear the input field after adding
        setNewCategoryName('');
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
  };

  const handleAddSubCategory = () => {
    // Create form data object for subcategory
    const formData = new FormData();
    formData.append('name', newSubCategoryName);
    formData.append('image', newSubCategoryImage);

    // Send POST request to add new subcategory
    axios.post(`http://localhost:8000/categories/${selectedCategoryId}/subcategories`, formData)
      .then(response => {
        // Update subcategories state with the new subcategory
        setSubCategories([...subCategories, response.data]);
        // Clear the input fields after adding
        setNewSubCategoryName('');
        setNewSubCategoryImage(null);
      })
      .catch(error => {
        console.error('Error adding subcategory:', error);
      });
  };

  const handleAddProduct = () => {
    // Create form data object for product
    const formData = new FormData();
    formData.append('name', newProductName);
    formData.append('description', newProductDescription);
    formData.append('price', newProductPrice);
    formData.append('image', newProductImage);

    // Send POST request to add new product
    axios.post(`http://localhost:8000/subcategories/${selectedSubCategoryId}/products`, formData)
      .then(response => {
         
        setProducts([...products, response.data]);
        // Clear the input fields after adding
        setNewProductName('');
        setNewProductDescription('');
        setNewProductPrice('');
        setNewProductImage(null);
        // Navigate to ShowData component after adding product
        navigate('/showdata');
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };
    
  // Handle file input change for subcategory image
  const handleSubCategoryImageChange = (e) => {
    setNewSubCategoryImage(e.target.files[0]);
  };

  // Handle file input change for product image
  const handleProductImageChange = (e) => {
    setNewProductImage(e.target.files[0]);
  };

  return (
    <>
        <Sidebar toggleMainWrapperMargin={toggleMainWrapperMargin} />

        <div className="content-wrapper main-wrapper " style={{ marginLeft: mainWrapperMargin }}>
        <div className="container mt-5 border p-4">
      <h1 className="text-center mb-4">ADD CATEGORY</h1>
      <div className="mb-3">
        <h3>Add Category</h3>
        <input type="text" className="form-control mb-2" placeholder="Enter category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
        <button className="btn btn-outline-danger btn-lg" onClick={handleAddCategory}>Add Category</button>
      </div>

      <div className="mb-3">
        <h3>Add Subcategory</h3>
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

      <div>
        <h3>Add Product</h3>
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
        <button className="btn  btn-outline-warning btn-lg" onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  </div>
</>
);
}

export default Newcategory;
