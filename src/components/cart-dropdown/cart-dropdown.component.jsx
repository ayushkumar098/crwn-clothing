import "./cart-dropdown.styles.scss";
import { updateUserCartInDatabase } from "../../utils/firebase/firebase.util";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";

const CartDropdown = () => {
  const {cartItems ,sum } = useContext(CartContext);
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    const response = updateUserCartInDatabase(currentUser,cartItems);
    console.log(response)
    navigate('/checkout');
  }
  //console.log(currentUser);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <h1>{sum}</h1>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
