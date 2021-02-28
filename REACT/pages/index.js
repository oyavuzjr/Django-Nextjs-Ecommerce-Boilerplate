import React from "react";
import Link from "next/link";
import { useStoreState, useStoreActions } from "easy-peasy";
const Index = () => {
  const counter = useStoreState(state => state.counter.count);
  const increment = useStoreActions(actions => actions.counter.increment);
  const decrement = useStoreActions(actions => actions.counter.decrement);
  const resetCounter = useStoreActions(actions => actions.counter.reset);

  return (
    <>
      <h1>Django Nextjs Ecommerce Template</h1>
      <hr />
      <div className="text-center">
        <img
          className="mb-5"
          style={{ width: "70%" }}
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
        />
      </div>
      <h1  className="mt-5" className="mt-4">Redux Counter</h1>
      <hr/>
      <h2>{counter}</h2>
      <button className="btn btn-secondary" type="button" onClick={() => decrement()}>
        -
      </button>
      <button className="btn btn-primary" type="button" onClick={() => increment()}>
        +
      </button>
      <Link href="/about">About</Link>
    </>
  );
};

export default Index;
