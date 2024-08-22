import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../redux/productSlice'; // Adjust import path as needed
import { BiAddToQueue, BiCartAdd, BiPlus, BiSolidPencil } from 'react-icons/bi';
import { BiTrash } from 'react-icons/bi';
import { BsEyeFill } from 'react-icons/bs';
import ProductModal from './ProductInputForm';
import { addToCart } from "../redux/cartSlice";

const ProductItems = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteClick = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEditClick = () => {
    navigate(`/edit-product/${product.id}`);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
}

  return (
    <tr>
    <td>{product.id}</td>
      <td>{product.productName}</td>
      <td className="fw-normal">{product.productDescription}</td>
      <td className="fw-normal">{product.productPrice}</td>
      {/* <td className="fw-normal">{product.productQuantity}</td> */}
      <td style={{ width: "5%" }}>
      </td>
      <td  className='fw-normal d-flex gap-2'>
      <Button variant="outline-primary" onClick={handleAddToCart(product)}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiPlus />
          </div>
        </Button>
      <Button variant="outline-primary" onClick={handleEditClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button>
        <Button variant="danger" onClick={() => handleDeleteClick(product.id)}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiTrash />
          </div>
        </Button>
        <ProductModal
        showModal={isOpen}
        handleClose={closeModal}
        info={{
          id: " ",
          productName: " ",
          productDescription: " ",
          productPrice: " ",
          productQuantity: " ",
        }}
      />
      </td>
    </tr>
  );
};

export default ProductItems;
