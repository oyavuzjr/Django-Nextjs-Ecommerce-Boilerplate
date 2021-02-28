import Link from 'next/link';
import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useRouter } from 'next/router';

const Login = () => {
  const [error] = useState('');
  const setToken = useStoreActions(actions => actions.auth.setToken);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setCart = useStoreActions(actions => actions.cart.setCart);
  const router = useRouter();
  const handleSubmit = e => {
    e.preventDefault();
    fetch(`${process.env.API_ENDPOINT}login/`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-type': 'application/json;charset=UTF-8' }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.token !== undefined && data.token !== null) {
          setToken(data.token);
          fetch(`${process.env.API_ENDPOINT}get-cart/`, {
            method: 'GET',
            headers: { Authorization: `Token ${data.token}` }
          })
            .then(response => {
              return response.json();
            })
            .then(productData => {
              const products = productData.map(x => x.product);
              productData.forEach((product, index) => {
                products[index].quantity = product.quantity;
              });
              setCart(products);
            });
          router.push('/products');
        }
      });
  };
  return (
    <>
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            placeholder="Email"
            onChange={e => setUsername(e.target.value)}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
      <br/>
      <Link href="signup">
        <a>Or Sign Up</a>
      </Link>
      <div className="text-danger">{error}</div>
    </>
  );
};

export default Login;
