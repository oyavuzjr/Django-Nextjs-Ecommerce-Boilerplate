import Link from "next/link";
import React,{useState} from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import AddToCart from "../components/AddToCart";

const Cart = () => {
  const setCart = useStoreActions((actions) => actions.cart.setCart);
  const cart = useStoreState(state => state.cart.items);
  // const updateItem = (e,actionType) => {
  //   const pid=(e.target.getAttribute("productId"));
  //   console.log("oha bufonu");
  //   console.log(actionType);
  // }





  return (
    <>
      <h1>Cart</h1>
      <hr />
      <div className="row">
        <div className="col col-12 col-md-6">
          <div className="card bg-light mb-3">
            <div className="card-header">Items</div>
            <div className="card-body">
              {cart.length === 0 ? (
                <>
                  <p>Your Cart is Empty </p>
                  <p>
                    <a>
                      <Link href="/products">Browse our products here :)</Link>
                    </a>
                  </p>
                </>
              ) : (
                cart.map((product,idx) => (
                  <div key={idx}>
                    <div className="row">
                      <div className="col-md-auto">
                        <img
                          alt="product"
                          height={80}
                          width={60}
                          src={product.image}
                        />
                      </div>
                      <div className="col  mt-auto mb-auto">
                        <h4>
                          {product.name}
                          <br /> <span>${product.price}</span>
                        </h4>
                        <div className="d-inline">
                        <AddToCart name={product.name} id={product.id} price={product.price} image={product.image} useSpinner={false} action={"remove"}><a type="button" class="btn btn-secondary btn-sm">-</a></AddToCart>
                        <AddToCart  name={product.name} id={product.id} price={product.price} image={product.image} useSpinner={false} ><a type="button" class="btn btn-primary btn-sm">+</a></AddToCart>
                          <span className="ml-2">x{product.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="col col-12 col-md-6">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Checkout</div>
            <div className="card-body">
              <h4 className="card-title">Your Total is ${cart.map(item=>(item.price*item.quantity)).reduce((a, b) => a + b, 0)}</h4>
              <p className="card-text">How would you like to pay?</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
