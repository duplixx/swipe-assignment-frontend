import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProduct,
  addProduct,
  deleteProduct,
} from '../redux/productSlice';
import { updateProductInInvoices } from '../redux/invoicesSlice';
import generateRandomId from '../utils/generateRandomId';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiTrash } from 'react-icons/bi';
import EditableField from './EditableField';

const ProductInputModal = ({
  showModal,
  handleClose,
  editMode,
  setEditMode,
  productIdToEdit,
}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    id: '',
    productName: '',
    productDescription: '',
    productPrice: '',
    productQuantity: '1',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMode && showModal && productIdToEdit) {
      const existingProduct = products.find(
        (product) => product.id === productIdToEdit,
      );
      if (existingProduct) {
        setNewProduct(existingProduct);
      }
    } else if (!editMode) {
      resetForm();
    }
  }, [editMode, showModal, productIdToEdit, products]);

  const validateProduct = () => {
    let tempErrors = {};
    if (!newProduct.productName)
      tempErrors.productName = 'Product name is required';
    if (!newProduct.productPrice)
      tempErrors.productPrice = 'Product price is required';
    if (isNaN(parseFloat(newProduct.productPrice)))
      tempErrors.productPrice = 'Product price must be a number';
    if (parseFloat(newProduct.productPrice) <= 0)
      tempErrors.productPrice = 'Product price must be greater than 0';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddOrUpdateProduct = () => {
    if (validateProduct()) {
      if (editMode) {
        dispatch(updateProduct(newProduct));
        dispatch(updateProductInInvoices(newProduct));
      } else {
        const productWithId = { ...newProduct, id: generateRandomId() };
        dispatch(addProduct(productWithId));
      }
      resetForm();
      setEditMode(false);
      handleClose();
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    // You might want to remove this product from all invoices as well
  };

  const resetForm = () => {
    setNewProduct({
      id: '',
      productName: '',
      productDescription: '',
      productPrice: '',
      productQuantity: '1',
    });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editMode ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>DESCRIPTION</th>
                <th>QTY</th>
                <th>PRICE/RATE</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ width: '40%' }}>
                    <EditableField
                      onItemizedItemEdit={(e) => {
                        const updatedProduct = {
                          ...product,
                          productName: e.target.value,
                        };
                        dispatch(updateProduct(updatedProduct));
                        dispatch(updateProductInInvoices(updatedProduct));
                      }}
                      cellData={{
                        type: 'text',
                        name: 'productName',
                        placeholder: 'Product Name',
                        value: product.productName,
                        id: product.id,
                      }}
                    />
                  </td>
                  <td style={{ width: '100%' }}>
                    <EditableField
                      onItemizedItemEdit={(e) => {
                        const updatedProduct = {
                          ...product,
                          productDescription: e.target.value,
                        };
                        dispatch(updateProduct(updatedProduct));
                        dispatch(updateProductInInvoices(updatedProduct));
                      }}
                      cellData={{
                        type: 'text',
                        name: 'productDescription',
                        placeholder: 'Product Description',
                        value: product.productDescription,
                        id: product.id,
                      }}
                    />
                  </td>
                  <td style={{ minWidth: '50px' }}>
                    <EditableField
                      onItemizedItemEdit={(e) => {
                        const updatedProduct = {
                          ...product,
                          productQuantity: e.target.value,
                        };
                        dispatch(updateProduct(updatedProduct));
                        dispatch(updateProductInInvoices(updatedProduct));
                      }}
                      cellData={{
                        type: 'number',
                        name: 'productQuantity',
                        min: 1,
                        step: '1',
                        value: product.productQuantity,
                        id: product.id,
                      }}
                    />
                  </td>
                  <td style={{ minWidth: '130px' }}>
                    <EditableField
                      onItemizedItemEdit={(e) => {
                        const updatedProduct = {
                          ...product,
                          productPrice: e.target.value,
                        };
                        dispatch(updateProduct(updatedProduct));
                        dispatch(updateProductInInvoices(updatedProduct));
                      }}
                      cellData={{
                        leading: '$',
                        type: 'number',
                        name: 'productPrice',
                        min: 1,
                        step: '0.01',
                        precision: 2,
                        textAlign: 'text-end',
                        value: product.productPrice,
                        id: product.id,
                      }}
                    />
                  </td>
                  <td className="text-center" style={{ minWidth: '50px' }}>
                    <BiTrash
                      onClick={() => handleDeleteProduct(product.id)}
                      style={{
                        height: '33px',
                        width: '33px',
                        padding: '7.5px',
                        cursor: 'pointer',
                        color: 'red',
                      }}
                      className="btn-icon"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div>
            <input
              type="text"
              name="productName"
              value={newProduct.productName}
              onChange={handleProductChange}
              placeholder="Product Name"
              className="form-control mb-2"
            />
            <input
              type="text"
              name="productDescription"
              value={newProduct.productDescription}
              onChange={handleProductChange}
              placeholder="Product Description"
              className="form-control mb-2"
            />
            <input
              type="number"
              name="productPrice"
              value={newProduct.productPrice}
              onChange={handleProductChange}
              placeholder="Product Price"
              className="form-control mb-2"
            />
            <input
              type="number"
              name="productQuantity"
              value={newProduct.productQuantity}
              onChange={handleProductChange}
              placeholder="Product Quantity"
              className="form-control mb-2"
            />
          </div>
        )}
        <Button className="fw-bold" onClick={handleAddOrUpdateProduct}>
          {editMode ? 'Update Product' : 'Add Product'}
        </Button>
        {errors.productName && (
          <div className="text-danger">{errors.productName}</div>
        )}
        {errors.productPrice && (
          <div className="text-danger">{errors.productPrice}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductInputModal;
