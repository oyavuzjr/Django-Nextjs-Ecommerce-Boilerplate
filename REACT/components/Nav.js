import Link from "next/link";
import AuthHandler from "./AuthHandler";
import { useStoreState, useStoreActions } from "easy-peasy";

const Nav = () => {
  const cartNum = useStoreState((state) => state.cart.itemNum);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link href="/">
        <a className="navbar-brand">Ecommerce</a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item" activeclassname="active">
            <Link href="/products">
              <a className="nav-link" href="#">
                Products
                <span className="sr-only">(current)</span>
              </a>
            </Link>
          </li>
          <li className="nav-item" activeclassname="active">
            <Link href="/about">
              <a className="nav-link">About</a>
            </Link>
          </li>
          <li className="nav-item" activeclassname="active">
          <Link href="/contact">
              <a className="nav-link">Contact Us</a>
            </Link>
          </li>
        </ul>
        <div className="mr-4">
        <AuthHandler />
        </div>
        <div>
        <Link href="/cart">
        <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="white"
          className="bi bi-cart-fill"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg></a></Link>
        <span className="badge bg-secondary">{cartNum}</span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
