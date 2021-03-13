import Link from "next/link";
import { useStoreState, useStoreActions } from "easy-peasy";
const AuthHandler = () => {
  const token = useStoreState(state => state.auth.token);
  const setCart = useStoreActions(actions=>actions.cart.setCart);
  const logout = useStoreActions(actions=>actions.auth.logout);

  return (
    <>
      {token != "" ? (
        <>
          <div className="dropdown show">
            <a
              className="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="white"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </a>

            <div onClick={()=>{logout(); setCart([])}} className="dropdown-menu pointy" aria-labelledby="dropdownMenuLink">
              <a  className="dropdown-item" >
                Logout
              </a>
            </div>
          </div>
        </>
      ) : (
        <Link href="/login">
          <a className="btn-sm btn-secondary ml-2">Login</a>
        </Link>
      )}
    </>
  );
};

export default AuthHandler;
