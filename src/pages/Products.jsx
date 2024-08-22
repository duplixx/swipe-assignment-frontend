// ProductsTab.js
import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, addProduct, deleteProduct } from '../redux/productSlice'; // Assuming productsSlice handles products
import generateRandomId  from '../utils/generateRandomId';
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import ProductItems from '../components/ProductItems';
import ProductModal from '../components/ProductInputForm';

const ProductsTab = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [show, setShow] = useState(false);
  const handleAddProduct = () => {
    const newProduct = { id: generateRandomId(), name: '', price: '0.00' };
    dispatch(addProduct(newProduct));
  };
  const [editMode,setEditMode] = useState(false);
  const handleEditProduct = (id, updatedData) => {
    dispatch(updateProduct({ id, updatedData }));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  const handleOpenModal = () => {
    setShow(true);
    setEditMode(false);
  }
  const closeModal = () => {
    setShow(false);
  }
  const handleProductChange = (id, updatedProduct) => {
    dispatch(updateProduct(id, updatedProduct));
};

  return (
    <Row>
      <ProductModal
        showModal={show}
        handleClose={closeModal}
        info={{
          id: " ",
          productName: " ",
          productDescription: " ",
          productPrice: " ",
          productQuantity: " ",
        }}
        editMode={false}
        setEditMode={setEditMode}
        productIdToEdit={null}
      />
      <Col md={8} lg={9}>
      <Card className="p-4 p-xl-5 my-3 my-xl-4">
      <Table responsive>
                <thead>
                  <tr>
                    <th>Sn No.</th>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product,index) => (
                    <ProductItems product={product} index={index+1} />
                  ))}
                </tbody>
              </Table>
      </Card>
    </Col>
    <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button
              className="d-block w-100 mb-2"
            onClick={handleOpenModal}>Add New Product</Button>
            </div>
      </Col>
    </Row>
  );
};

export default ProductsTab;
