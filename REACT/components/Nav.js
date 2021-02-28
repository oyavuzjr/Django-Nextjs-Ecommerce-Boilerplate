import Link from "next/link";
import AuthHandler from "./AuthHandler";
import { useStoreState, useStoreActions } from "easy-peasy";

const Nav = () => {
  const cartNum = useStoreState((state) => state.cart.itemNum);
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link href="/">
        <a class="navbar-brand">Ecommerce</a>
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" activeClassName="active">
            <Link href="/products">
              <a class="nav-link" href="#">
                Products
                <span class="sr-only">(current)</span>
              </a>
            </Link>
          </li>
          <li class="nav-item" activeClassName="active">
            <Link href="/about">
              <a class="nav-link">About</a>
            </Link>
          </li>
          <li class="nav-item" activeClassName="active">
          <Link href="/contact">
              <a class="nav-link">Contact Us</a>
            </Link>
          </li>
        </ul>
        <AuthHandler />
        <div>
        <Link href="/cart">
        <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="white"
          class="bi bi-cart-fill"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg></a></Link>
        <span class="badge bg-secondary">{cartNum}</span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
