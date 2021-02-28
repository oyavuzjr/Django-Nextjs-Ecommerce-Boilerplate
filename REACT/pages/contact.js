import React from 'react';
import { useStoreState } from 'easy-peasy';

const Contact = () => {
  const counter = useStoreState(state => state.counter.count);

  return (
    <>
      <h1>Contact</h1>
      <hr />
      <p>Thank you for visiting our website!</p>
      <p>Please reach us at ecommerce@example.com</p>
    </>
  );
};

export default Contact;
