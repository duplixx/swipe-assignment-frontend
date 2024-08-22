import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, updateProduct } from '../redux/productSlice';
import { BiPlus, BiSolidPencil, BiTrash } from 'react-icons/bi';
import ProductModal from './ProductInputForm';
import { addToCart } from "../redux/cartSlice";

const ProductItems = ({ product, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
const [editMode,setEditMode] = useState(false);
  const handleDeleteClick = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEditClick = (product) => {
    setIsOpen(true);
    setEditMode(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentProduct(null);
  };

  const handleSaveChanges = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    closeModal();
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      dispatch(addToCart({
        ...product,
        productQuantity: existingProduct.productQuantity + 1
      }));
    } else {
      dispatch(addToCart({ ...product, productQuantity: 1 }));
    }
    alert('Product added to invoice items');
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{product.productName}</td>
      <td className="fw-normal">{product.productDescription}</td>
      <td className="fw-normal">{product.productPrice}</td>
      <td style={{ width: "5%" }}></td>
      <td className='fw-normal d-flex gap-2'>
        <Button variant="outline-primary" onClick={() => handleAddToCart(product)}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiPlus />
          </div>
        </Button>
        <Button variant="outline-primary" onClick={() => handleEditClick(product)}>
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
          info={currentProduct}
          onSaveChanges={handleSaveChanges}
          editMode={editMode}
          setEditMode={setEditMode}
          productIdToEdit={currentProduct?.id}
        />
      </td>
    </tr>
  );
};

export default ProductItems;
