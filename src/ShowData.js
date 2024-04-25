import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShowData = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleEdit = (id) => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      setEditingId(id);
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/products/${editingId}`, { name, description, price });
      const updatedProducts = products.map(product => {
        if (product.id === editingId) {
          return { ...product, name, description, price };
        }
        return product;
      });
      setProducts(updatedProducts);
      setEditingId(null);
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Product List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={() => handleEdit(product.id)}>Edit</button>
                <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingId && (
        <div>
          <h2>Edit Product</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ShowData;
