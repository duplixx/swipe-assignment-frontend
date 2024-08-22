import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, addProduct, deleteProduct } from "../redux/productSlice";
import generateRandomId from "../utils/generateRandomId";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const ProductInputModal = ({ showModal, handleClose,editMode,setEditMode }) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    const [newProduct, setNewProduct] = useState({
        id: '',
        productName: '',
        productDescription: '',
        productPrice: '',
        productQuantity: '1',
    });


    useEffect(() => {
        if (editMode && showModal) {
            const existingProduct = products.find(product => product.id === newProduct.id);
            if (existingProduct) {
                setNewProduct(existingProduct);
            }
        }
    }, [editMode, showModal, newProduct.id, products]);

    const handleAddOrUpdateProduct = () => {
        if (newProduct.productName) {
            if (editMode) {
                dispatch(updateProduct(newProduct));
            } else {
                dispatch(addProduct({ ...newProduct, id: generateRandomId() }));
            }
            setNewProduct({
                id: '',
                productName: '',
                productDescription: '',
                productPrice: '',
                productQuantity: '1',
            });
            setEditMode(false);
            handleClose(); 
        }
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Edit Product' : 'Add Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        {products.map(product => (
                            <tr key={product.id}>
                                <td style={{ width: "40%" }}>
                                    <EditableField
                                        onItemizedItemEdit={handleProductChange}
                                        cellData={{
                                            type: "text",
                                            name: "productName",
                                            placeholder: "Product Name",
                                            value: product.productName,
                                            id: product.id,
                                        }}
                                    />
                                </td>
                                <td style={{ width: "100%" }}>
                                    <EditableField
                                        onItemizedItemEdit={handleProductChange}
                                        cellData={{
                                            type: "text",
                                            name: "productDescription",
                                            placeholder: "Product Description",
                                            value: product.productDescription,
                                            id: product.id,
                                        }}
                                    />
                                </td>
                                <td style={{ minWidth: "130px" }}>
                                    <EditableField
                                        onItemizedItemEdit={handleProductChange}
                                        cellData={{
                                            leading: '$', 
                                            type: "number",
                                            name: "productPrice",
                                            min: 1,
                                            step: "0.01",
                                            precision: 2,
                                            textAlign: "text-end",
                                            value: product.productPrice,
                                            id: product.id,
                                        }}
                                    />
                                </td>
                                <td className="text-center" style={{ minWidth: "50px" }}>
                                    <BiTrash
                                        onClick={() => handleDeleteProduct(product.id)}
                                        style={{ height: "33px", width: "33px", padding: "7.5px", cursor: 'pointer', color: 'red' }}
                                        className="btn-icon"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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
                    <Button className="fw-bold" onClick={handleAddOrUpdateProduct}>
                        {editMode ? 'Update Product' : 'Add Product'}
                    </Button>
                </div>
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
