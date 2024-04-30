import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductIteam = () => {
  const location = useLocation();
  const product = location.state && location.state.product;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {product && (
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductIteam;
