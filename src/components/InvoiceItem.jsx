import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { BiTrash } from 'react-icons/bi';
import EditableField from './EditableField';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '../redux/cartSlice';

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency } = props;
  const cart = useSelector((state) => state.cart);
  const itemTable = cart.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      {/* <Button className="fw-bold" onClick={onRowAdd}> // action is done through product page
        Add Item
      </Button> */}
    </div>
  );
};

const ItemRow = (props) => {
  const dispatch = useDispatch();

  const onDelEvent = () => {
    dispatch(removeFromCart(props.item.id));
  };
  const onQuantityChange = (evt) => {
    const updatedQuantity = parseInt(evt.target.value, 10);
    if (updatedQuantity > 0) {
      dispatch(
        updateCart({
          id: props.item.id,
          updatedItem: {
            productQuantity: updatedQuantity,
          },
        }),
      );
    }
  };
  return (
    <tr>
      <td style={{ width: '100%' }}>
        <span>{props.item.productName}</span>
        <span>{props.item.productDescription}</span>
      </td>
      <td style={{ minWidth: '70px' }}>
        <EditableField
          onItemizedItemEdit={onQuantityChange}
          cellData={{
            type: 'number',
            name: 'itemQuantity',
            min: 1,
            step: '1',
            value: props.item.productQuantity,
            id: props.item.id,
          }}
        />
      </td>
      <td style={{ minWidth: '130px' }}>
        <span>
          {props.currency}
          {props.item.productPrice}
        </span>
      </td>
      <td className="text-center" style={{ minWidth: '50px' }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: '33px', width: '33px', padding: '7.5px' }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
