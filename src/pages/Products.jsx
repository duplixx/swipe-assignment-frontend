import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../redux/productsSlice';
import ProductItem from '../components/ProductItem'

const ProductsTab = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const handleProductChange = (id, updatedFields) => {
    dispatch(updateProduct({ id, ...updatedFields }));
  };

  return (
    <div>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onProductChange={handleProductChange}
        />
      ))}
    </div>
  );
};

export default ProductsTab;