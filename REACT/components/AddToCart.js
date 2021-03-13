import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import BeatLoader from "react-spinners/BeatLoader";

const AddToCart = ({ children, name, id, price, image, size, action="add", useSpinner=true}) => {
  const [waiting, setWaiting] = useState(false);
  const setCart = useStoreActions((actions) => actions.cart.setCart);
  const token = useStoreState((state) => state.auth.token);
  const addToCart = useStoreActions((actions) => actions.cart.addToCartGuest);
  const addItem = useStoreActions(actions=>actions.cart.addItem);
  const setNotification = useStoreActions(
    (actions) => actions.toaster.setNotification
  );
  const popNotification = useStoreActions(
    (actions) => actions.toaster.popNotification
  );

  function handleClick(e) {
    e.preventDefault();
    if (waiting === false) {
      if(useSpinner){
        setWaiting(true);
      }

      if (token !== "") {
        addItem({action,id,token,"callback":setWaiting,popNotification});
      } else {
        addToCartGuest({ name, id, price, image, quantity: action==="add"?1:-1 });
        setTimeout(function () {
          popNotification();
        }, 5000);
        setWaiting(false)
      }
      setNotification({ message: `${name} was ${action==="add"?"added to":"removed from"} cart!`, img: image });

    }
  }
  return (
    <>
      {waiting === false ? (
        <a onClick={handleClick}>{children}</a>
      ) : (
        <div className="text-center">
        <div className="spinner-border" role="status" style={{"height":size,"width":size,"color":"#c23616"}}>
          <span className="sr-only">Loading...</span>
        </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;
