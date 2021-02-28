import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import BeatLoader from "react-spinners/BeatLoader";

const AddToCart = ({ children, name, id, price, image, size, action="add", useSpinner=true}) => {
  const [waiting, setWaiting] = useState(false);
  const setCart = useStoreActions((actions) => actions.cart.setCart);
  const token = useStoreState((state) => state.auth.token);
  const addToCart = useStoreActions((actions) => actions.cart.addToCart);
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
      setNotification({ message: `${name} was ${action==="add"?"added to":"removed from"} cart!`, img: image });
      const res = () => {
        fetch(`${process.env.API_ENDPOINT}update-item/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ action, productId: id }),
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            setWaiting(false);
            setTimeout(function () {
              popNotification();
            }, 5000);
            const newCart = data.map((item) => item.product);
            data.forEach((item, index) => {
              newCart[index].quantity = item.quantity;
            });
            setCart(newCart);
          })
          .catch((error) => {
            console.error(error, "catch the hoop");
          });
      };
      if (token !== "") {
        res();
      } else {
        addToCart({ name, id, price, image, quantity: action==="add"?1:-1 });
        setTimeout(function () {
          popNotification();
        }, 5000);
        setWaiting(false)
      }
    }
  }
  return (
    <>
      {waiting === false ? (
        <a onClick={handleClick}>{children}</a>
      ) : (
        <div className="text-center">
        <div class="spinner-border text-danger" role="status" style={{"height":size,"width":size}}>
          <span class="sr-only">Loading...</span>
        </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;
