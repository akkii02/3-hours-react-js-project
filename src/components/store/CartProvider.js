import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const totalAmount = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Placeholder function for determining size based on some logic
  const determineSizeLogic = (item) => {
    // Replace this with your actual logic for determining the size
    // For now, I'm assuming the item has a property called 'size'
    return item.size || "DefaultSize";
  };

  const addItemToCartHandler = (item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((existingItem) => existingItem.id === item.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + existingItem.quantity }
            : item
        );
      } else {
        const newItem = { ...item, quantity: 1, size: determineSizeLogic(item) }; // Add size based on some logic
        return [...prevItems, newItem];
      }
    });
  };

  const removeItemFromCartHandler = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    message: "I am accessible",
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
