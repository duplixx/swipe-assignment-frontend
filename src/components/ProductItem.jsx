import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  updateProduct, addProduct, deleteProduct } from "../redux/productSlice";
import generateRandomId from "../utils/generateRandomId";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const ProductInputField = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    const [newProduct, setNewProduct] = useState({
        id: '',
        productName: '',
        productDescription: '',
        productPrice: '',
        productQuantity: '',
    });

    const handleAddOrUpdateProduct = () => {
        if(newProduct.productName){
            const existingProduct = products.find(product => product.product === newProduct.productName);

            if(existingProduct){
                dispatch(updateProduct({...existingProduct, ...newProduct}));
            } 
            else{
                dispatch(addProduct({...newProduct, id: generateRandomId()}));
            }

            setNewProduct({
                id: '',
                productName: '',
                productDescription: '',
                productPrice: '',
                productQuantity: '',
            });
        }
    };

    const handleProductChange = (e, id) => {
        const { name, value } = e.target;
        dispatch(updateProduct({ id, [name]: value }));
    };

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <div>
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
                                    onItemizedItemEdit={(e) => handleProductChange(e, product.id)}
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
                                    onItemizedItemEdit={(e) => handleProductChange(e, product.id)}
                                    cellData={{
                                        type: "text",
                                        name: "productDescription",
                                        placeholder: "Product Description",
                                        value: product.productDescription,
                                        id: product.id,
                                    }}
                                />
                            </td>
                            <td style={{ minWidth: "70px" }}>
                                <EditableField
                                    onItemizedItemEdit={(e) => handleProductChange(e, product.id)}
                                    cellData={{
                                        type: "number",
                                        name: "productQuantity",
                                        min: 1,
                                        step: "1",
                                        value: product.productQuantity,
                                        id: product.id,
                                    }}
                                />
                            </td>
                            <td style={{ minWidth: "130px" }}>
                                <EditableField
                                    onItemizedItemEdit={(e) => handleProductChange(e, product.id)}
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
                    onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
                    placeholder="Product Name"
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="productDescription"
                    value={newProduct.productDescription}
                    onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
                    placeholder="Product Description"
                    className="form-control mb-2"
                />
                <input
                    type="number"
                    name="productPrice"
                    value={newProduct.productPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
                    placeholder="Product Price"
                    className="form-control mb-2"
                />
                <input
                    type="number"
                    name="productQuantity"
                    value={newProduct.productQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
                    placeholder="Product Quantity"
                    className="form-control mb-2"
                />
                <Button className="fw-bold" onClick={handleAddOrUpdateProduct}>Add Product</Button>
            </div>
        </div>
    );
};

export default ProductInputField;