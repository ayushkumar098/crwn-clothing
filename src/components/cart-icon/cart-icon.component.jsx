import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../Assets/shopping-bag.svg";

import "./cart-icon.styles.scss";
import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
  const { iscartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleIsCartOpen = () => {
    setIsCartOpen(!iscartOpen);
  }
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
