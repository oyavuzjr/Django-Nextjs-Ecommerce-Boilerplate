import React from 'react';
import { useStoreState } from 'easy-peasy';

const About = () => {
  const counter = useStoreState(state => state.counter.count);

  return (
    <>
      <h1>About</h1>
      <hr />
      <h1>{counter}</h1>
      <p>Welcome to about page!</p>
    </>
  );
};

export default About;
