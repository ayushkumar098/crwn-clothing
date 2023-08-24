import { createContext, useState } from "react";


export const CartContext = createContext({
  iscartOpen: false,
  setIsCartOpen: () => {}
});

export const CartProvider = ({ children }) => {
    const [iscartOpen, setIsCartOpen] = useState(false);
    const value = {iscartOpen,setIsCartOpen};
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
