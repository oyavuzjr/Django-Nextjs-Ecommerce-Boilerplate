import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignUp = () => {
  const setToken = useStoreActions(actions => actions.auth.setToken);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();
  const handleSubmit = e => {
    e.preventDefault();
    fetch(`${process.env.API_ENDPOINT}register/`, {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password,
        password2
      }),
      headers: { 'Content-type': 'application/json;charset=UTF-8' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.response === 'successfully registered new user') {
          router.push('/products');
          setToken(data.token);
        } else {
          setMessage('There was a problem :(');
        }
      });
  };
  return (
    <>
      <h1>SignUp</h1>
      <hr />

      <div className="login">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              placeholder="Email"
              onChange={e => setUsername(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Password"
              onChange={e => setPassword2(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        <br />
        <Link href="login">
          <a>Or Log In</a>
        </Link>
      </div>
      <br />
      <p className="text-danger">{message}</p>
    </>
  );
};

export default SignUp;
