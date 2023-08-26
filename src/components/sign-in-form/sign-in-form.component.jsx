import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sign-in-form.styles.scss";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  getUserDataFromDb,
} from "../../utils/firebase/firebase.util";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

const defaultFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const { currentUser } = useContext(UserContext);
  const { populateCartFromDatabase, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();

      const userData = await getUserDataFromDb(currentUser);
      //console.log(userData.cartItems);
      //const cartItemsFromBatabase = userData.cartItems;
      populateCartFromDatabase(userData.cartItems);

      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect password for the email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
