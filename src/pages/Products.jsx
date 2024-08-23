import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import ProductItems from '../components/ProductItems';
import ProductModal from '../components/ProductInputForm';

const ProductsTab = () => {
  const products = useSelector((state) => state.products);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [productIdToEdit, setProductIdToEdit] = useState(null);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditMode(true);
      setProductIdToEdit(product.id);
    } else {
      setEditMode(false);
      setProductIdToEdit(null);
    }
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    setEditMode(false);
    setProductIdToEdit(null);
  };

  return (
    <Row>
      <ProductModal
        showModal={show}
        handleClose={closeModal}
        editMode={editMode}
        setEditMode={setEditMode}
        productIdToEdit={productIdToEdit}
      />
      <Col md={8} lg={9}>
        <Card className="p-4 p-xl-5 my-3 my-xl-4">
          <Table responsive>
            <thead>
              <tr>
                <th>Sn No.</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <ProductItems
                  key={product.id}
                  product={product}
                  index={index + 1}
                  onEdit={() => handleOpenModal(product)}
                />
              ))}
            </tbody>
          </Table>
        </Card>
      </Col>
      <Col md={4} lg={3}>
        <div className="sticky-top pt-md-3 pt-xl-4">
          <Button
            className="d-block w-100 mb-2"
            onClick={() => handleOpenModal()}
          >
            Add New Product
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ProductsTab;
