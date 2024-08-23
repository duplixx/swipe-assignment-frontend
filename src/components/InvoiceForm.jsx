import React, { useState } from 'react';
import { Tabs, Tab, Card } from 'react-bootstrap';
import ProductsTab from '../pages/Products';
import InvoiceDetails from './InvoiceDetails';

const InvoiceForm = () => {
  const [key, setKey] = useState('invoice');

  return (
    <div>
      <Tabs
        id="invoice-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mt-3"
      >
        <Tab eventKey="invoice" title="Invoice Details">
          <Card className="p-4 mt-3">
            <InvoiceDetails />
          </Card>
        </Tab>
        <Tab eventKey="products" title="Products">
          <Card className="p-4 mt-3">
            <ProductsTab />
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default InvoiceForm;
