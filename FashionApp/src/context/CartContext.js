import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0); 

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      selectedItemsCount,
      setSelectedItemsCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};
